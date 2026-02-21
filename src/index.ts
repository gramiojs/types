import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import { getCustomSchema } from "@gramio/schema-parser";
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
const { methods } = schema;
const objects = schema.objects

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
