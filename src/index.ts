import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import prettier from "prettier";
import { OUTPUT_PATH, PRETTIER_OPTIONS, SCHEMA_FILE_PATH } from "./config";
import { APIMethods, Objects, Params } from "./entities";
import { CodeGenerator, fetchCurrencies, generateHeader } from "./helpers";
import type { IBotAPI } from "./types";

export interface IGeneratedFile {
	name: string;
	lines: string[][];
}

const schemaFile = await fs.readFile(SCHEMA_FILE_PATH);
const schema = JSON.parse(String(schemaFile)) as IBotAPI.ISchema;

const currenciesList = await fetchCurrencies();

currenciesList.push("XTR");

schema.objects.push({
	name: "Currencies",
	type: "any_of",
	description:
		"Telegram payments currently support the currencies listed below.",
	documentation_link:
		"https://core.telegram.org/bots/payments#supported-currencies",
	any_of: currenciesList.map((currency) => ({
		type: "string",
		default: currency,
	})) as IBotAPI.IArgument[],
});

schema.objects.push({
	name: "APIResponseOk",
	generic: "<Methods extends keyof APIMethods = keyof APIMethods>",
	description:
		"If 'ok' equals True, the request was successful and the result of the query can be found in the 'result' field.",
	documentation_link: "https://core.telegram.org/bots/api/#making-requests",
	properties: [
		{
			name: "ok",
			description: "If 'ok' equals True, the request was successful",
			type: "bool",
			required: true,
			default: true,
		},
		{
			name: "result",
			description: "The result of the query can be found in the 'result' field",
			type: "bool",
			//![INFO] some hack for make result: APIMethodReturns<Methods>
			default: "APIMethodReturn<Methods>",
			required: true,
		},
	],
});

schema.objects.push({
	name: "APIResponseError",
	description:
		"In case of an unsuccessful request, 'ok' equals false and the error is explained in the 'description'. An Integer 'error_code' field is also returned, but its contents are subject to change in the future. Some errors may also have an optional field 'parameters' of the type ResponseParameters, which can help to automatically handle the error.",
	documentation_link: "https://core.telegram.org/bots/api/#making-requests",
	properties: [
		{
			name: "ok",
			description: "In case of an unsuccessful request, 'ok' equals false",
			type: "bool",
			required: true,
			default: false,
		},
		{
			name: "description",
			description: "The error is explained in the 'description'",
			type: "string",
			required: true,
		},
		{
			name: "error_code",
			description:
				"An Integer 'error_code' field is also returned, but its contents are subject to change in the future",
			type: "integer",
			required: true,
		},
		{
			name: "parameters",
			description:
				"Some errors may also have an optional field 'parameters' of the type [ResponseParameters](https://core.telegram.org/bots/api/#responseparameters), which can help to automatically handle the error.",
			type: "reference",
			reference: "ResponseParameters",
			required: true,
		},
	],
});

schema.objects.push({
	name: "APIResponse",
	description: "Union type of Response",
	generic: "<Methods extends keyof APIMethods = keyof APIMethods>",
	documentation_link: "https://core.telegram.org/bots/api/#making-requests",
	type: "any_of",
	any_of: [
		{
			type: "reference",
			reference: "APIResponseOk<Methods>",
		},
		{
			type: "reference",
			reference: "APIResponseError",
		},
		// JSON-SCHEMA to ts wrong result?
	] as IBotAPI.IArgument[],
});

const InputFile = schema.objects.find((x) => x.name === "InputFile");

if (InputFile) {
	InputFile.type = "any_of";
	InputFile.any_of = [
		{
			required: true,
			type: "bool",
			default: "Blob",
		},
		// TODO: improve typings by JSON Schema
	] as IBotAPI.IArgument[];
}

const createForumTopic = schema.methods.find(
	(x) => x.name === "createForumTopic",
);

if (createForumTopic) {
	const icon_color = createForumTopic.arguments?.find(
		(x) => x.name === "icon_color",
	);
	const RGBs = icon_color?.description.match(/\b0x[0-9a-fA-F]{6}/g);
	if (icon_color && RGBs) {
		icon_color.type = "any_of";
		icon_color.any_of = RGBs.map((x) => ({
			type: "bool",
			required: true,
			default: x.replace(/\b0x/, "0x"),
		})) as IBotAPI.IArgument[];
	}
}

const getStarTransactions = schema.methods.find(
	(x) => x.name === "getStarTransactions",
);

if (getStarTransactions) {
	// @ts-expect-error
	getStarTransactions.return_type = {
		type: "reference",
		reference: "StarTransactions",
	};
}

const header = generateHeader(schema.version, schema.recent_changes);

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
			Objects.generateMany(schema.objects),
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
			Params.generateMany(schema.methods),
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
			APIMethods.generateMany(schema.methods),
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
