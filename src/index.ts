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
