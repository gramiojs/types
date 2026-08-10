import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import { type Field, getCustomSchema } from "@gramio/schema-parser";
import prettier from "prettier";
import { OUTPUT_PATH, PRETTIER_OPTIONS } from "./config";
import { APIMethods, Objects, Params } from "./entities";
import { CodeGenerator, generateHeader } from "./helpers";

export interface IGeneratedFile {
	name: string;
	lines: string[][];
}

// ─── Fetch & parse ────────────────────────────────────────────────────────────

const schema = await getCustomSchema();

// Guard against UTF-8 → CP1251 mojibake. A 4-byte emoji in UTF-8 starts with
// `F0 9F`, which when decoded as windows-1251 becomes "рџ". That sequence never
// legitimately appears in the Telegram Bot API schema, so its presence means
// the upstream HTTP response was decoded with the wrong charset (this shipped
// broken strings like `SendDiceEmoji = "рџЋІ" | ...` in v9.6.0).
{
	const serialized = JSON.stringify(schema);
	const match = serialized.match(/.{0,40}рџ.{0,40}/);
	if (match) {
		throw new Error(
			`Schema contains UTF-8 → CP1251 mojibake — upstream response was decoded with the wrong charset.\nContext: ${match[0]}`,
		);
	}
}

const { methods } = schema;
const objects = schema.objects

// Guard against silently losing FormattableString support. Telegram documents a
// `parse_mode` sibling for exactly those text fields that accept formatting
// entities, so each of them must reach the output as
// `string | { toString(): string }` — see `fieldToType` in entities/properties.ts.
// The pairing broke once already: Bot API 10.1 reworded editMessageText's
// description from "after entities parsing" to the singular "after entity
// parsing", the description-based detection in @gramio/schema-parser stopped
// firing, and v10.1.0 shipped `SendMessageParams.text: string | { toString(): string }`
// next to `EditMessageTextParams.text?: string`. Fail the generation instead of
// publishing that asymmetry again — including when an older parser resolves.
{
	const isMessageEntities = (field: Field) =>
		field.type === "array" &&
		field.arrayOf.type === "reference" &&
		field.arrayOf.reference.name === "MessageEntity";

	const isFormattable = (field?: Field) =>
		field?.type === "string" && field.semanticType === "formattable";

	const problems: string[] = [];

	function check(container: string, fields: Field[]) {
		for (let i = 0; i < fields.length; i++) {
			const parseMode = fields[i];
			if (!parseMode.key?.endsWith("parse_mode")) continue;

			// `${key}_parse_mode` names its target; a bare `parse_mode` claims the
			// field it is documented under (skipping MessageEntity[] siblings).
			let target: Field | undefined;
			if (parseMode.key === "parse_mode") {
				let index = i - 1;
				while (index >= 0 && isMessageEntities(fields[index])) index--;
				target = fields[index];
			} else
				target = fields.find(
					(f) => f.key === parseMode.key.replace(/_parse_mode$/, ""),
				);

			if (!isFormattable(target))
				problems.push(
					`${container}.${target?.key ?? "?"} — partner of ` +
						`${parseMode.key}, but not semanticType:"formattable"`,
				);
		}

		// The reverse direction: a formattable mark on a container without any
		// parse_mode sibling means a response field got widened by mistake.
		if (!fields.some((f) => f.key?.endsWith("parse_mode")))
			for (const field of fields)
				if (isFormattable(field))
					problems.push(
						`${container}.${field.key} — semanticType:"formattable" without any parse_mode sibling`,
					);
	}

	for (const method of methods) check(method.name, method.parameters);
	for (const object of objects)
		if (object.type === "fields") check(object.name, object.fields);

	if (problems.length)
		throw new Error(
			`Formattable/parse_mode mismatch in the parsed schema — the generated types would be inconsistent (some text fields accepting FormattableString, others not). Fix the detection in @gramio/schema-parser (applyFormattableSiblings) or bump it:\n  ${problems.join(
				"\n  ",
			)}`,
		);
}

// ─── Build markupTypes from schema ────────────────────────────────────────────
// schema-parser marks objects like InlineKeyboardMarkup with semanticType:"markup".
// We derive the set once so generators can emit `| { toJSON(): T }` unions.

const markupTypes = new Set(
	objects
		.filter((o) => o.semanticType === "markup")
		.map((o) => o.name),
);

// ─── File generation ──────────────────────────────────────────────────────────

const header = generateHeader(schema.version);

const files: IGeneratedFile[] = [
	{
		name: "objects.d.ts",
		lines: [
			header(
				"This module contains [Objects](https://core.telegram.org/bots/api#available-types) with the `Telegram` prefix",
				[
					"@example import object",
					"```typescript",
					`import { TelegramUser } from "@gramio/types/objects";`,
					"```",
				],
			),
			[
				`import type { APIMethods } from "./methods";`,
				`import type { APIMethodReturn } from "./utils"`,
				"",
			],
			Objects.generateMany(objects, markupTypes),
		],
	},
	{
		name: "params.d.ts",
		lines: [
			header(
				"This module contains params for [methods](https://core.telegram.org/bots/api#available-methods) with the `Params` postfix",
				[
					"@example import params",
					"```typescript",
					`import { SendMessageParams } from "@gramio/types/params";`,
					"```",
				],
			),
			[
				`import type { APIMethods } from "./methods";`,
				`import type * as Objects from "./objects"`,
				"",
			],
			Params.generateMany(methods, markupTypes),
		],
	},
	{
		name: "methods.d.ts",
		lines: [
			header(
				"This module contains [API methods](https://core.telegram.org/bots/api#available-methods) types (functions map with input/output)",
				[
					"@example import API methods map",
					"```typescript",
					`import { APIMethods } from "@gramio/types/methods";`,
					"",
					`type SendMessageReturn = Awaited<ReturnType<APIMethods["sendMessage"]>>;`,
					`//   ^? type SendMessageReturn = TelegramMessage"`,
					"```",
				],
			),
			[
				`import type { CallAPIWithOptionalParams, CallAPI, CallAPIWithoutParams } from "./utils"`,
				`import type * as Params from "./params"`,
				`import type * as Objects from "./objects"`,
				"",
			],
			APIMethods.generateMany(methods),
		],
	},
	{
		name: "index.d.ts",
		lines: [
			header(
				"This module re-export another modules (+ export params as TelegramParams/objects as TelegramObjects)",
				[
					"@example import",
					"```typescript",
					`import { TelegramUser, SendMessageParams, APIMethods, APIMethodReturn } from "@gramio/types";`,
					"```",
				],
			),
			[`export type * from "./methods"`],
			[`export type * from "./params"`],
			[`export type * as TelegramParams from "./params"`],
			[`export type * from "./objects"`],
			[`export type * as TelegramObjects from "./objects"`],
			[`export type { APIMethodParams, APIMethodReturn } from "./utils"`],
		],
	},
	{
		name: "utils.d.ts",
		lines: [
			header("This module contains type-utils for convenient work", [
				"@example import utils",
				"```typescript",
				`import { APIMethodParams, APIMethodReturn } from "@gramio/types/utils";`,
				"",
				`type SendMessageReturn = APIMethodReturn<"sendMessage">;`,
				`//   ^? type SendMessageReturn = TelegramMessage"`,
				`type SendMessageParams = APIMethodParams<"sendMessage">;`,
				`//   ^? type SendMessageParams = SendMessageParams"`,
				"```",
			]),
			[
				`import type { APIMethods } from "./methods"`,
				"",
				"export type CallAPI<T, R> = (params: T) => Promise<R>",
				"export type CallAPIWithoutParams<R> = () => Promise<R>",
				"export type CallAPIWithOptionalParams<T, R> = (params?: T) => Promise<R>",
				"",
				...CodeGenerator.generateComment([
					"@example",
					"```typescript",
					`type SendMessageParams = APIMethodParams<"sendMessage">;`,
					`//   ^? type SendMessageParams = SendMessageParams"`,
					"```",
				]),
				"export type APIMethodParams<APIMethod extends keyof APIMethods> = Parameters<APIMethods[APIMethod]>[0]",
				...CodeGenerator.generateComment([
					"@example",
					"```typescript",
					`type SendMessageReturn = APIMethodReturn<"sendMessage">;`,
					`//   ^? type SendMessageReturn = TelegramMessage"`,
					"```",
				]),
				"export type APIMethodReturn<APIMethod extends keyof APIMethods> = Awaited<ReturnType<APIMethods[APIMethod]>>",
				"",
			],
		],
	},
];

if (!existsSync(OUTPUT_PATH)) await fs.mkdir(OUTPUT_PATH);

for await (const file of files) {
	await fs.writeFile(
		`${OUTPUT_PATH}/${file.name}`,
		await prettier.format(file.lines.flat().join("\n"), PRETTIER_OPTIONS),
	);
}
