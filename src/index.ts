import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import type {
	Field,
	FieldBoolean,
	ObjectWithFields,
	ObjectWithOneOf,
} from "@gramio/schema-parser";
import { getCustomSchema } from "@gramio/schema-parser";
import prettier from "prettier";
import { OUTPUT_PATH, PRETTIER_OPTIONS } from "./config";
import { APIMethods, Objects, Params } from "./entities";
import { CodeGenerator, fetchCurrencies, generateHeader } from "./helpers";

export interface IGeneratedFile {
	name: string;
	lines: string[][];
}

// ─── Fetch & parse ────────────────────────────────────────────────────────────

const schema = await getCustomSchema();
const { methods } = schema;
const objects = schema.objects

// ─── Synthetic / patched objects ──────────────────────────────────────────────

// Currencies — derived from Telegram's supported-currencies endpoint
const currenciesList = await fetchCurrencies();
currenciesList.push("XTR");

objects.push({
	name: "Currencies",
	anchor: "#supported-currencies",
	description:
		"Telegram payments currently support the currencies listed below.",
	type: "oneOf",
	oneOf: currenciesList.map((currency) => ({
		type: "string",
		key: "",
		const: currency,
	})) as Field[],
} satisfies ObjectWithOneOf);

// APIResponseOk<Methods> — generic helper (generic is non-standard; handled in Objects.generate)
objects.push({
	name: "APIResponseOk",
	anchor: "#making-requests",
	description:
		"If 'ok' equals True, the request was successful and the result of the query can be found in the 'result' field.",
	type: "fields",
	generic: "<Methods extends keyof APIMethods = keyof APIMethods>",
	fields: [
		{
			key: "ok",
			type: "boolean",
			const: true,
			required: true,
			description: "If 'ok' equals True, the request was successful",
		} satisfies FieldBoolean,
		{
			key: "result",
			// Hack: we need the literal TypeScript expression `APIMethodReturn<Methods>`
			// as the type. We abuse boolean+const the same way the old generator did.
			type: "boolean",
			const: "APIMethodReturn<Methods>" as unknown as boolean,
			required: true,
			description:
				"The result of the query can be found in the 'result' field",
		} satisfies FieldBoolean,
	],
} as ObjectWithFields & { generic?: string });

objects.push({
	name: "APIResponseError",
	anchor: "#making-requests",
	description:
		"In case of an unsuccessful request, 'ok' equals false and the error is explained in the 'description'.",
	type: "fields",
	fields: [
		{
			key: "ok",
			type: "boolean",
			const: false,
			required: true,
			description: "In case of an unsuccessful request, 'ok' equals false",
		} satisfies FieldBoolean,
		{
			key: "description",
			type: "string",
			required: true,
			description: "The error is explained in the 'description'",
		},
		{
			key: "error_code",
			type: "integer",
			required: true,
			description: "An Integer 'error_code' field",
		},
		{
			key: "parameters",
			type: "reference",
			required: true,
			description:
				"Optional field 'parameters' of the type [ResponseParameters](https://core.telegram.org/bots/api/#responseparameters)",
			reference: { name: "ResponseParameters", anchor: "#responseparameters" },
		},
	],
} satisfies ObjectWithFields);

objects.push({
	name: "APIResponse",
	anchor: "#making-requests",
	description: "Union type of Response",
	type: "oneOf",
	generic: "<Methods extends keyof APIMethods = keyof APIMethods>",
	oneOf: [
		{
			type: "reference",
			key: "",
			reference: { name: "APIResponseOk<Methods>", anchor: "#making-requests" },
		},
		{
			type: "reference",
			key: "",
			reference: { name: "APIResponseError", anchor: "#making-requests" },
		},
	] as Field[],
} as ObjectWithOneOf & { generic?: string });

// InputFile — override "unknown" stub with a Blob union
const inputFileIdx = objects.findIndex((o) => o.name === "InputFile");
if (inputFileIdx !== -1) {
	objects[inputFileIdx] = {
		name: "InputFile",
		anchor: "#inputfile",
		description:
			"This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data.",
		type: "oneOf",
		oneOf: [
			{
				type: "boolean",
				key: "",
				// Same hack as before: use the literal TS expression "Blob" as the type
				const: "Blob" as unknown as boolean,
			} satisfies FieldBoolean,
		],
	} satisfies ObjectWithOneOf;
}
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
			Objects.generateMany(objects),
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
			Params.generateMany(methods),
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
