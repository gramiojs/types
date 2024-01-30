import fs from "node:fs/promises";
import prettier from "prettier";
import { PRETTIER_OPTIONS, SCHEMA_FILE_PATH } from "./config";
import { ApiMethods, Objects, Params } from "./entities";
import { generateHeader } from "./helpers";
import { IBotApi } from "./types";

export interface IGeneratedFile {
	path: string;
	lines: string[][];
}

const schemaFile = await fs.readFile(SCHEMA_FILE_PATH);
const schema = JSON.parse(String(schemaFile)) as IBotApi.ISchema;

const header = generateHeader(schema.version, schema.recent_changes);

const files: IGeneratedFile[] = [
	{
		path: "./types/objects.d.ts",
		lines: [header, Objects.generateMany(schema.objects)],
	},
	{
		path: "./types/params.d.ts",
		lines: [
			header,
			[`import * as Objects from "./objects"`, ""],
			Params.generateMany(schema.methods),
		],
	},
	{
		path: "./types/methods.d.ts",
		lines: [
			header,
			[
				`import * as Params from "./params"`,
				`import * as Objects from "./objects"`,
				"",
				"type TCallApi<T, R> = (params: T) => Promise<R>",
				"type TCallApiWithoutParams<R> = () => Promise<R>",
				"type TCallApiWithOptionalParams<T, R> = (params?: T) => Promise<R>",
				"",
			],

			ApiMethods.generateMany(schema.methods),
		],
	},
	{
		path: "./types/index.d.ts",
		lines: [
			[`export * from "./methods"`],
			[`export * from "./params"`],
			[`export * from "./objects"`],
		],
	},
	{
		path: "./types/index.js",
		lines: [["export {}"]],
	},
];

for await (const file of files) {
	await fs.writeFile(
		file.path,
		await prettier.format(file.lines.flat().join("\n"), PRETTIER_OPTIONS),
	);
}
