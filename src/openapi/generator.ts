import prettier from "prettier";
import { PRETTIER_OPTIONS } from "../config";

type JsonObject = Record<string, unknown>;
type Context = { namespace: string; input: boolean };

export function object(value: unknown, location: string): JsonObject {
	if (!value || typeof value !== "object" || Array.isArray(value))
		throw new Error(`${location}: expected an object`);
	return value as JsonObject;
}

function list(value: unknown, location: string): unknown[] {
	if (!Array.isArray(value)) throw new Error(`${location}: expected an array`);
	return value;
}

function identifier(value: string): string {
	if (!/^[A-Za-z_$][\w$]*$/.test(value))
		throw new Error(`Invalid TypeScript identifier: ${value}`);
	return value;
}

const upper = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const quote = (value: string) => JSON.stringify(value);
const comment = (value: unknown) =>
	typeof value === "string"
		? `/**\n${value
				.replaceAll("*/", "* / ")
				.split("\n")
				.map((line) => ` * ${line}`)
				.join("\n")}\n */\n`
		: "";
const markups = new Set([
	"InputInlineKeyboardMarkup",
	"InlineKeyboardMarkup",
	"ReplyKeyboardMarkup",
	"ReplyKeyboardRemove",
	"ForceReply",
]);

/** A deliberately separate path: no HTML scraping or schema-parser heuristics. */
export class OpenAPIGenerator {
	private readonly root: JsonObject;
	private readonly schemas: JsonObject;
	private readonly schemaPrefix: string;
	private readonly aliases = new Map<string, string>();
	/** Runtime validation constraints cannot all be represented in TypeScript. */
	readonly warnings = new Map<string, number>();
	private readonly inputs = new Set<string>();

	constructor(document: unknown) {
		this.root = object(document, "document");
		const version = this.root.openapi ?? this.root.swagger;
		if (
			typeof version !== "string" ||
			!(/^(3\.0\.|3\.1\.|3\.2\.)/.test(version) || version === "2.0")
		)
			throw new Error("Expected Swagger 2.0 or OpenAPI 3.0/3.1/3.2 JSON");
		const info = object(this.root.info, "info");
		if (typeof info.version !== "string")
			throw new Error("info.version: expected a string");
		object(this.root.paths, "paths");
		this.schemaPrefix =
			version === "2.0" ? "#/definitions/" : "#/components/schemas/";
		this.schemas = object(
			version === "2.0"
				? this.root.definitions
				: object(this.root.components, "components").schemas,
			"schemas",
		);
	}

	private resolve(value: unknown, seen = new Set<string>()): JsonObject {
		const schema = object(value, "schema");
		if (schema.$ref === undefined) return schema;
		if (typeof schema.$ref !== "string" || !schema.$ref.startsWith("#/"))
			throw new Error(
				`Only local JSON references are supported: ${schema.$ref}`,
			);
		if (seen.has(schema.$ref))
			throw new Error(`Cyclic alias reference: ${schema.$ref}`);
		seen.add(schema.$ref);
		let target: unknown = this.root;
		for (const segment of schema.$ref.slice(2).split("/"))
			target = object(target, schema.$ref)[
				segment.replaceAll("~1", "/").replaceAll("~0", "~")
			];
		return {
			...this.resolve(target, seen),
			...Object.fromEntries(
				Object.entries(schema).filter(([key]) => key !== "$ref"),
			),
		};
	}

	private type(value: unknown, ctx: Context): string {
		if (value === true) return "unknown";
		if (value === false) return "never";
		const schema = object(value, "schema");
		for (const key of [
			"prefixItems",
			"patternProperties",
			"unevaluatedProperties",
		])
			if (key in schema) throw new Error(`Unsupported schema keyword: ${key}`);
		for (const key of ["if", "not"])
			if (key in schema)
				this.warnings.set(key, (this.warnings.get(key) ?? 0) + 1);
		const rendered = this.baseType(schema, ctx);
		return schema.nullable === true ? `(${rendered}) | null` : rendered;
	}

	private baseType(schema: JsonObject, ctx: Context): string {
		// API callers pass objects/arrays; transport serializes contentSchema to JSON.
		if (schema.contentSchema !== undefined)
			return this.type(schema.contentSchema, ctx);
		if (schema.$ref !== undefined) {
			if (
				typeof schema.$ref !== "string" ||
				!schema.$ref.startsWith(this.schemaPrefix)
			)
				throw new Error(`Expected a schema reference: ${schema.$ref}`);
			const name = schema.$ref.slice(this.schemaPrefix.length);
			if (!(name in this.schemas))
				throw new Error(`Unknown schema reference: ${name}`);
			const reference = `${ctx.namespace}Telegram${identifier(name)}`;
			return ctx.input && markups.has(name)
				? `(${reference} | { toJSON(): ${reference} })`
				: reference;
		}
		if ("const" in schema) return this.literal(schema.const);
		if (schema.enum !== undefined) {
			const values = list(schema.enum, "enum");
			if (!values.length) throw new Error("enum cannot be empty");
			return values.map((value) => this.literal(value)).join(" | ");
		}
		for (const [key, separator] of [
			["oneOf", " | "],
			["anyOf", " | "],
			["allOf", " & "],
		] as const) {
			if (schema[key] !== undefined) {
				const variants = list(schema[key], key);
				if (!variants.length) throw new Error(`${key} cannot be empty`);
				const parts = variants.map((variant) => this.type(variant, ctx));
				if (key === "allOf") {
					const meaningful = parts.filter((part) => part !== "unknown");
					const siblings = Object.fromEntries(
						Object.entries(schema).filter(([name]) => name !== key),
					);
					if (siblings.type !== undefined || siblings.properties !== undefined)
						meaningful.push(this.type(siblings, ctx));
					return meaningful.length
						? meaningful.map((part) => `(${part})`).join(" & ")
						: "unknown";
				}
				// JSON Schema allows properties/type alongside a composition keyword.
				const siblings = Object.fromEntries(
					Object.entries(schema).filter(([name]) => name !== key),
				);
				const composed = `(${parts
					.map((part) => `(${part})`)
					.join(separator)})`;
				return siblings.properties !== undefined
					? `${composed} & (${this.type(siblings, ctx)})`
					: composed;
			}
		}
		if (Array.isArray(schema.type))
			return schema.type
				.map((type) => `(${this.type({ ...schema, type }, ctx)})`)
				.join(" | ");
		switch (schema.type) {
			case "string":
				return schema.format === "binary" ? "Blob" : "string";
			case "integer":
			case "number":
				return "number";
			case "boolean":
				return "boolean";
			case "null":
				return "null";
			case "file":
				return "Blob";
			case "array":
				return `(${this.type(schema.items, ctx)})[]`;
			case undefined:
				if (Array.isArray(schema.required) && !schema.properties)
					return `{ ${schema.required
						.map((name) => `${quote(String(name))}: unknown;`)
						.join(" ")} }`;
				if (
					schema.properties === undefined &&
					schema.additionalProperties === undefined
				)
					return "unknown";
				return this.baseType({ ...schema, type: "object" }, ctx);
			case "object": {
				const fields = this.fields(schema, ctx);
				const additional = schema.additionalProperties;
				if (additional !== undefined && additional !== false) {
					const dictionary = `Record<string, ${this.type(additional, ctx)}>`;
					return fields ? `({ ${fields} } & ${dictionary})` : dictionary;
				}
				return fields ? `{ ${fields} }` : "Record<string, unknown>";
			}
			default:
				throw new Error(`Unsupported schema type: ${schema.type}`);
		}
	}

	private literal(value: unknown): string {
		if (
			value === null ||
			["string", "number", "boolean"].includes(typeof value)
		)
			return JSON.stringify(value);
		throw new Error("Only scalar enum/const values are supported");
	}

	private fields(
		schema: JsonObject,
		ctx: Context,
		aliasPrefix?: string,
	): string {
		const properties = object(schema.properties ?? {}, "properties");
		const required = new Set(list(schema.required ?? [], "required"));
		const names = Object.keys(properties);
		const formattable = new Set<string>();
		if (ctx.input)
			for (const [index, name] of names.entries()) {
				if (!name.endsWith("parse_mode")) continue;
				let partner = name.replace(/_parse_mode$/, "");
				if (name === "parse_mode") {
					partner =
						["text", "caption", "message_text"].find(
							(candidate) => candidate in properties,
						) ?? names[index - 1];
				}
				if (!partner || this.resolve(properties[partner]).type !== "string")
					throw new Error(`Cannot find text partner of ${name}`);
				formattable.add(partner);
			}
		return Object.entries(properties)
			.map(([name, value]) => {
				const field = this.resolve(value);
				let type = this.type(value, ctx);
				if (
					aliasPrefix &&
					Array.isArray(field.enum) &&
					["string", "integer", "number"].includes(String(field.type))
				) {
					const alias = identifier(
						aliasPrefix +
							upper(
								name.replace(/_([a-z])/g, (_, letter: string) =>
									letter.toUpperCase(),
								),
							),
					);
					this.aliases.set(alias, `export type ${alias} = ${type};`);
					type = alias;
				}
				if (ctx.input && name.endsWith("parse_mode"))
					type = '"HTML" | "MarkdownV2" | "Markdown"';
				if (formattable.has(name)) type = "string | { toString(): string }";
				const decodedField =
					field.contentSchema === undefined
						? field
						: this.resolve(field.contentSchema);
				if (name === "allowed_updates" && decodedField.type === "array")
					type = `Exclude<keyof ${ctx.namespace}TelegramUpdate, "update_id">[]`;
				const description =
					!ctx.namespace &&
					!required.has(name) &&
					typeof field.description === "string"
						? `*Optional*. ${field.description}`
						: field.description;
				return `${comment(description)}${quote(name)}${
					required.has(name) ? "" : "?"
				}: ${type};`;
			})
			.join("\n");
	}

	private content(value: unknown): unknown {
		const content = object(value, "content");
		// Telegram encodes the same parameters in JSON and multipart requests.
		const media =
			content["application/json"] ??
			content["multipart/form-data"] ??
			content["application/x-www-form-urlencoded"];
		if (!media)
			throw new Error(
				`Unsupported media types: ${Object.keys(content).join(", ")}`,
			);
		return this.resolve(media).schema;
	}

	private parameters(path: JsonObject, operation: JsonObject): JsonObject {
		const properties: JsonObject = Object.create(null);
		const required = new Set<string>();
		const parameters = new Map<string, JsonObject>();
		for (const entry of [
			...list(path.parameters ?? [], "path.parameters"),
			...list(operation.parameters ?? [], "operation.parameters"),
		]) {
			const parameter = this.resolve(entry);
			parameters.set(`${parameter.in}:${parameter.name}`, parameter);
		}
		const mergeBody = (value: unknown) => {
			const body = this.resolve(value);
			// Telegram's multipart wrapper adds arbitrary attachment field names.
			// Upload traversal is the transport's job, not named API parameters.
			if (body.allOf && !body.properties) {
				for (const variant of list(body.allOf, "request allOf"))
					mergeBody(variant);
				return;
			}
			if (body.oneOf || body.anyOf)
				throw new Error("Union request bodies are not supported");
			Object.assign(
				properties,
				object(body.properties ?? {}, "request properties"),
			);
			for (const name of list(body.required ?? [], "request required")) {
				if (typeof name !== "string")
					throw new Error("required: expected string names");
				required.add(name);
			}
		};
		for (const parameter of parameters.values()) {
			if (parameter.in === "body") {
				mergeBody(parameter.schema);
				continue;
			}
			// The token belongs to the transport, never to *Params.
			if (parameter.in === "path" || parameter.in === "header") continue;
			if (
				!["query", "formData"].includes(String(parameter.in)) ||
				typeof parameter.name !== "string"
			)
				throw new Error("Unsupported parameter location/name");
			properties[parameter.name] = parameter.schema ?? parameter;
			if (parameter.required === true) required.add(parameter.name);
		}
		if (operation.requestBody !== undefined)
			mergeBody(this.content(this.resolve(operation.requestBody).content));
		return { type: "object", properties, required: [...required] };
	}

	async generate(): Promise<Record<string, string>> {
		this.aliases.clear();
		this.warnings.clear();
		this.inputs.clear();
		const visitInputs = (value: unknown): void => {
			if (!value || typeof value !== "object") return;
			if (Array.isArray(value)) {
				value.forEach(visitInputs);
				return;
			}
			const record = object(value, "input schema");
			if (
				typeof record.$ref === "string" &&
				record.$ref.startsWith(this.schemaPrefix)
			) {
				const name = record.$ref.slice(this.schemaPrefix.length);
				if (!this.inputs.has(name)) {
					this.inputs.add(name);
					visitInputs(this.schemas[name]);
				}
			}
			Object.values(record).forEach(visitInputs);
		};
		for (const value of Object.values(object(this.root.paths, "paths"))) {
			const path = this.resolve(value);
			const operation = path.post ?? path.get;
			if (operation)
				visitInputs(this.parameters(path, this.resolve(operation)));
		}
		const objects: string[] = [];
		for (const [name, value] of Object.entries(this.schemas)) {
			const schema = this.resolve(value);
			if (schema.allOf && schema.properties) {
				const category = name.endsWith("Params")
					? "request validation allOf"
					: "object validation allOf";
				this.warnings.set(category, (this.warnings.get(category) ?? 0) + 1);
			}
			// Request interfaces belong to params.d.ts, not Telegram* objects.
			if (name.endsWith("Params")) continue;
			const typeName = `Telegram${identifier(name)}`;
			// Response text stays string; only documented input objects get builders.
			const ctx = { namespace: "", input: this.inputs.has(name) };
			if (
				(schema.properties || schema.type === "object") &&
				!schema.oneOf &&
				!schema.anyOf &&
				schema.additionalProperties === undefined
			) {
				objects.push(
					`${comment(
						schema.description,
					)}export interface ${typeName} { ${this.fields(
						schema,
						ctx,
						typeName,
					)} }`,
				);
			} else {
				const type = name === "InputFile" ? "Blob" : this.type(value, ctx);
				objects.push(
					`${comment(schema.description)}export type ${typeName} = ${type};`,
				);
			}
		}
		const objectAliases = [...this.aliases.values()];
		this.aliases.clear();
		const params: string[] = [];
		const methods: string[] = [];
		const seen = new Set<string>();
		for (const [route, value] of Object.entries(
			object(this.root.paths, "paths"),
		)) {
			const path = this.resolve(value);
			const operationValue = path.post ?? path.get;
			if (!operationValue) continue;
			const operation = this.resolve(operationValue);
			// File downloads use a different server and return bytes, not Bot API results.
			if (operation.operationId === "downloadFile" && route.includes("{"))
				continue;
			// Path names are the Bot API wire method names; operationId may have prefixes.
			const name = identifier(route.split("/").filter(Boolean).at(-1) ?? "");
			if (seen.has(name)) throw new Error(`Duplicate method: ${name}`);
			seen.add(name);
			const body = this.parameters(path, operation);
			const fields = this.fields(
				body,
				{ namespace: "Objects.", input: true },
				upper(name),
			);
			const paramsName = `${upper(name)}Params`;
			if (fields)
				params.push(
					`${comment(
						`Params object for {@link APIMethods.${name} | ${name}} method`,
					)}export interface ${paramsName} { ${fields} }`,
				);
			const responses = object(operation.responses, `${name}.responses`);
			const success = responses["200"] ?? responses["2XX"];
			if (!success)
				throw new Error(`${name}: missing successful response schema`);
			const response = this.resolve(success);
			let result = response.schema ?? this.content(response.content);
			const resolved = this.resolve(result);
			if (resolved.properties) {
				const properties = object(resolved.properties, "response.properties");
				if (properties.ok !== undefined && properties.result !== undefined)
					result = properties.result;
			}
			const returnType = this.type(result, {
				namespace: "Objects.",
				input: false,
			});
			const call = !fields
				? `CallAPIWithoutParams<${returnType}>`
				: `${
						list(body.required, "required").length
							? "CallAPI"
							: "CallAPIWithOptionalParams"
				  }<Params.${paramsName}, ${returnType}>`;
			methods.push(
				`${comment(
					operation.description ?? operation.summary,
				)}${name}: ${call};`,
			);
		}
		if (!seen.size) throw new Error("No GET/POST Bot API operations found");
		// These transport-level helpers are package API, not documentation objects.
		for (const name of ["APIResponse", "APIResponseOk", "APIResponseError"])
			if (name in this.schemas)
				throw new Error(`Schema collides with package helper: ${name}`);
		objects.push(`
export interface TelegramAPIResponseOk<Methods extends keyof APIMethods = keyof APIMethods> { ok: true; result: APIMethodReturn<Methods>; }
export interface TelegramAPIResponseError { ok: false; error_code: number; description: string; ${
			"ResponseParameters" in this.schemas
				? "parameters?: TelegramResponseParameters;"
				: ""
		} }
export type TelegramAPIResponse<Methods extends keyof APIMethods = keyof APIMethods> = TelegramAPIResponseOk<Methods> | TelegramAPIResponseError;
`);
		const header = comment(
			`Based on Bot API ${
				object(this.root.info, "info").version
			}; generated from Swagger/OpenAPI JSON. Do not edit.`,
		);
		const files = {
			"objects.d.ts": `import type { APIMethods } from "./methods"; import type { APIMethodReturn } from "./utils";\n${objectAliases.join(
				"\n",
			)}\n${objects.join("\n")}`,
			"params.d.ts": `import type { APIMethods } from "./methods"; import type * as Objects from "./objects";\n${[
				...this.aliases.values(),
				...params,
			].join("\n")}`,
			"methods.d.ts": `import type * as Objects from "./objects"; import type * as Params from "./params"; import type { CallAPI, CallAPIWithOptionalParams, CallAPIWithoutParams } from "./utils";\nexport interface APIMethods { ${methods.join(
				"\n",
			)} }`,
			"utils.d.ts": `import type { APIMethods } from "./methods";
export type CallAPI<T, R> = (params: T) => Promise<R>;
export type CallAPIWithoutParams<R> = () => Promise<R>;
export type CallAPIWithOptionalParams<T, R> = (params?: T) => Promise<R>;
export type APIMethodParams<APIMethod extends keyof APIMethods> = Parameters<APIMethods[APIMethod]>[0];
export type APIMethodReturn<APIMethod extends keyof APIMethods> = Awaited<ReturnType<APIMethods[APIMethod]>>;`,
			"index.d.ts": `export type * from "./methods"; export type * from "./params"; export type * from "./objects"; export type * as TelegramParams from "./params"; export type * as TelegramObjects from "./objects"; export type { APIMethodParams, APIMethodReturn } from "./utils";`,
		};
		return Object.fromEntries(
			await Promise.all(
				Object.entries(files).map(async ([name, source]) => [
					name,
					await prettier.format(`${header}\n${source}`, PRETTIER_OPTIONS),
				]),
			),
		);
	}
}
