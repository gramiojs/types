import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import prettier from "prettier";
import { OUTPUT_PATH, PRETTIER_OPTIONS, SCHEMA_FILE_PATH } from "./config";
import { ApiMethods, Objects, Params } from "./entities";
import { generateHeader } from "./helpers";
import { IBotApi } from "./types";

export interface IGeneratedFile {
	name: string;
	lines: string[][];
}

const schemaFile = await fs.readFile(SCHEMA_FILE_PATH);
const schema = JSON.parse(String(schemaFile)) as IBotApi.ISchema;

schema.objects.push({
	name: "APIResponseOk",
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
			//![INFO] some hack for make result: Record<string, unknown>
			default: "Record<string, unknown>",
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
	documentation_link: "https://core.telegram.org/bots/api/#making-requests",
	type: "any_of",
	any_of: [
		{
			type: "reference",
			reference: "APIResponseOk",
		},
		{
			type: "reference",
			reference: "APIResponseError",
		},
		// JSON-SCHEMA to ts wrong result?
	] as IBotApi.IArgument[],
});

const InputFile = schema.objects.find((x) => x.name === "InputFile");

if (InputFile) {
	InputFile.type = "any_of";
	InputFile.any_of = [
		// TODO: improve typings by JSON Schema
		{
			required: true,
			type: "bool",
			default: "File",
		} as IBotApi.IArgument,
	];
}

const header = generateHeader(schema.version, schema.recent_changes);

const files: IGeneratedFile[] = [
	{
		name: "objects.d.ts",
		lines: [header, Objects.generateMany(schema.objects)],
	},
	{
		name: "params.d.ts",
		lines: [
			header,
			[`import * as Objects from "./objects"`, ""],
			Params.generateMany(schema.methods),
		],
	},
	{
		name: "methods.d.ts",
		lines: [
			header,
			[
				`import * as Params from "./params"`,
				`import * as Objects from "./objects"`,
				"",
				"type CallApi<T, R> = (params: T) => Promise<R>",
				"type CallApiWithoutParams<R> = () => Promise<R>",
				"type CallApiWithOptionalParams<T, R> = (params?: T) => Promise<R>",
				"",
			],

			ApiMethods.generateMany(schema.methods),
		],
	},
	{
		name: "index.d.ts",
		lines: [
			[`export * from "./methods"`],
			[`export * from "./params"`],
			[`export * from "./objects"`],
		],
	},
	{
		name: "index.js",
		lines: [["export {}"]],
	},
];

if (!existsSync(OUTPUT_PATH)) await fs.mkdir(OUTPUT_PATH);

for await (const file of files) {
	await fs.writeFile(
		`${OUTPUT_PATH}/${file.name}`,
		await prettier.format(file.lines.flat().join("\n"), PRETTIER_OPTIONS),
	);
}
