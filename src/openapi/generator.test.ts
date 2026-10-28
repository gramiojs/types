import { describe, expect, test } from "bun:test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { serve } from "bun";
import ts from "typescript";
import { compareDeclarations } from "./compare";
import { OpenAPIGenerator } from "./generator";
import { loadDocument } from "./index";

const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });

/** Small fixture following the official 3.2 document's actual wire shapes. */
function fixture() {
	return {
		openapi: "3.2.0",
		info: { title: "Bot API fixture", version: "10.3" },
		paths: {
			"/getMe": {
				post: {
					responses: { "200": { $ref: "#/components/responses/getMe" } },
				},
			},
			"/sendPhoto": {
				post: {
					requestBody: {
						content: {
							"multipart/form-data": {
								schema: {
									allOf: [ref("SendPhotoParams")],
									unevaluatedProperties: ref("InputFile"),
								},
							},
						},
					},
					responses: {
						"200": {
							content: {
								"application/json": {
									schema: { type: "boolean", const: true },
								},
							},
						},
					},
				},
			},
			"/getUpdates": {
				post: {
					requestBody: {
						content: {
							"application/json": { schema: ref("GetUpdatesParams") },
						},
					},
					responses: {
						"200": {
							content: {
								"application/json": {
									schema: { type: "array", items: ref("Update") },
								},
							},
						},
					},
				},
			},
			"/{file_directory}/{file_name}": {
				get: {
					operationId: "downloadFile",
					responses: { "200": { content: { "application/octet-stream": {} } } },
				},
			},
		},
		components: {
			schemas: {
				InputFile: { contentMediaType: "application/octet-stream" },
				FileInput: { anyOf: [ref("InputFile"), { type: "string" }] },
				InputMessageEntity: {
					type: "object",
					required: ["type"],
					properties: { type: { type: "string", enum: ["bold", "italic"] } },
				},
				InputInlineKeyboardMarkup: {
					type: "object",
					required: ["inline_keyboard"],
					properties: {
						inline_keyboard: {
							type: "array",
							items: { type: "array", items: { type: "string" } },
						},
					},
				},
				ReplyMarkup: {
					type: "object",
					anyOf: [ref("InputInlineKeyboardMarkup")],
				},
				User: {
					type: "object",
					required: ["id"],
					properties: {
						id: { type: "integer" },
						is_bot: { type: "boolean", const: false },
					},
				},
				Message: { type: "object", properties: { text: { type: "string" } } },
				Update: {
					type: "object",
					required: ["update_id"],
					properties: {
						update_id: { type: "integer" },
						message: ref("Message"),
					},
				},
				InputTextMessageContent: {
					type: "object",
					properties: {
						message_text: { type: "string" },
						link_preview_options: { type: "object" },
						parse_mode: { type: "string" },
					},
				},
				SendPhotoParams: {
					type: "object",
					required: ["chat_id", "photo"],
					properties: {
						chat_id: { anyOf: [{ type: "integer" }, { type: "string" }] },
						photo: ref("FileInput"),
						caption: { type: "string" },
						parse_mode: { type: "string", enum: ["HTML", "MarkdownV2"] },
						caption_entities: {
							type: "string",
							contentMediaType: "application/json",
							contentSchema: {
								type: "array",
								items: ref("InputMessageEntity"),
							},
						},
						reply_markup: ref("ReplyMarkup"),
						inline_content: ref("InputTextMessageContent"),
					},
					allOf: [
						{
							if: { required: ["business_connection_id"] },
							then: { properties: { chat_id: { type: "integer" } } },
						},
					],
				},
				GetUpdatesParams: {
					type: "object",
					properties: {
						allowed_updates: { type: "array", items: { type: "string" } },
					},
				},
			},
			responses: {
				getMe: {
					content: {
						"application/json": { $ref: "#/components/mediaTypes/UserResult" },
					},
				},
			},
			mediaTypes: {
				UserResult: {
					schema: {
						type: "object",
						required: ["ok", "result"],
						properties: { ok: { const: true }, result: ref("User") },
					},
				},
			},
		},
	};
}

describe("official OpenAPI generation", () => {
	test("unwraps response/media refs, separates params, handles optional/no params and download routes", async () => {
		const files = await new OpenAPIGenerator(fixture()).generate();
		expect(files["methods.d.ts"]).toContain(
			"getMe: CallAPIWithoutParams<Objects.TelegramUser>",
		);
		expect(files["methods.d.ts"]).toContain(
			"sendPhoto: CallAPI<Params.SendPhotoParams, true>",
		);
		expect(files["methods.d.ts"]).toContain(
			"getUpdates: CallAPIWithOptionalParams<",
		);
		expect(files["methods.d.ts"]).not.toContain("downloadFile");
		expect(files["objects.d.ts"]).not.toContain("TelegramSendPhotoParams");
	});

	test("preserves uploads, contentSchema, builders and formatting without widening response text", async () => {
		const files = await new OpenAPIGenerator(fixture()).generate();
		expect(files["objects.d.ts"]).toContain(
			"export type TelegramInputFile = Blob",
		);
		expect(files["objects.d.ts"]).toContain(
			"export type TelegramFileInput = TelegramInputFile | string",
		);
		expect(files["params.d.ts"]).toContain("caption?: string | {");
		expect(files["params.d.ts"]).toContain(
			"caption_entities?: Objects.TelegramInputMessageEntity[]",
		);
		expect(files["objects.d.ts"]).toContain(
			"toJSON(): TelegramInputInlineKeyboardMarkup",
		);
		expect(files["objects.d.ts"]).toContain("message_text?: string | {");
		expect(files["objects.d.ts"]).toContain("text?: string");
		expect(files["objects.d.ts"]).toContain("is_bot?: false");
		expect(files["params.d.ts"]).toContain(
			'Exclude<keyof Objects.TelegramUpdate, "update_id">[]',
		);
	});

	test("keeps update names typed when allowed_updates is a JSON-encoded array", async () => {
		const document = fixture();
		const properties: Record<string, unknown> =
			document.components.schemas.GetUpdatesParams.properties;
		properties.allowed_updates = {
			type: "string",
			contentMediaType: "application/json",
			contentSchema: { type: "array", items: { type: "string" } },
		};
		const files = await new OpenAPIGenerator(document).generate();
		expect(files["params.d.ts"]).toContain(
			'Exclude<keyof Objects.TelegramUpdate, "update_id">[]',
		);
	});

	test("is deterministic and generated declarations typecheck strictly", async () => {
		const generator = new OpenAPIGenerator(fixture());
		const files = await generator.generate();
		expect(await generator.generate()).toEqual(files);
		const directory = await fs.mkdtemp(
			path.join(os.tmpdir(), "gramio-openapi-test-"),
		);
		try {
			await Promise.all(
				Object.entries(files).map(([name, text]) =>
					fs.writeFile(path.join(directory, name), text),
				),
			);
			const usage = path.join(directory, "usage.ts");
			await fs.writeFile(
				usage,
				`import type { SendPhotoParams } from "./params";
const params: SendPhotoParams = {
  chat_id: 1, photo: new Blob(), caption: { toString() { return "formatted"; } },
  reply_markup: { toJSON() { return { inline_keyboard: [[]] }; } },
  caption_entities: [{ type: "bold" }],
};
void params;`,
			);
			const program = ts.createProgram(
				[
					usage,
					...Object.keys(files).map((name) => path.join(directory, name)),
				],
				{
					noEmit: true,
					strict: true,
					skipLibCheck: false,
					types: [],
					target: ts.ScriptTarget.ES2022,
					module: ts.ModuleKind.ESNext,
				},
			);
			expect(
				ts
					.getPreEmitDiagnostics(program)
					.map((diagnostic) =>
						ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
					),
			).toEqual([]);
		} finally {
			await fs.rm(directory, { recursive: true, force: true });
		}
	});

	test("rejects non-OpenAPI input and broken schema references", async () => {
		expect(() => new OpenAPIGenerator({ types: {} })).toThrow(
			"Expected Swagger",
		);
		const document = fixture();
		document.components.schemas.FileInput.anyOf[0] = ref("DoesNotExist");
		await expect(new OpenAPIGenerator(document).generate()).rejects.toThrow(
			"Unknown schema reference",
		);
	});

	test("supports scalar enums/const including empty string, numeric zero and nullable types", async () => {
		const document = fixture();
		const schemas: Record<string, unknown> = document.components.schemas;
		schemas.TestValues = {
			type: "object",
			properties: {
				blank: { const: "" },
				zero: { const: 0 },
				value: { type: ["string", "null"] },
				values: { type: "array", items: { type: "integer" } },
			},
		};
		const files = await new OpenAPIGenerator(document).generate();
		expect(files["objects.d.ts"]).toContain('blank?: ""');
		expect(files["objects.d.ts"]).toContain("zero?: 0");
		expect(files["objects.d.ts"]).toContain("value?: string | null");
		expect(files["objects.d.ts"]).toContain("values?: number[]");
	});

	test("reads a local JSON file and rejects malformed JSON", async () => {
		const directory = await fs.mkdtemp(
			path.join(os.tmpdir(), "gramio-schema-test-"),
		);
		const filename = path.join(directory, "schema.json");
		try {
			await fs.writeFile(filename, JSON.stringify(fixture()));
			expect(await loadDocument(filename)).toEqual(fixture());
			await fs.writeFile(filename, "<!doctype html>");
			await expect(loadDocument(filename)).rejects.toThrow("invalid JSON");
		} finally {
			await fs.rm(directory, { recursive: true, force: true });
		}
	});
});

test("HTTP loader validates JSON, rejects HTML even with status 200, and handles HTTP errors", async () => {
	const server = serve({
		port: 0,
		hostname: "127.0.0.1",
		fetch(request) {
			const pathname = new URL(request.url).pathname;
			if (pathname === "/schema") return Response.json(fixture());
			if (pathname === "/error")
				return new Response("unavailable", { status: 503 });
			return new Response("<!doctype html><title>Telegram</title>", {
				headers: { "content-type": "text/html" },
			});
		},
	});
	try {
		expect(await loadDocument(`${server.url}schema`)).toEqual(fixture());
		await expect(loadDocument(`${server.url}html`)).rejects.toThrow(
			"received HTML",
		);
		await expect(loadDocument(`${server.url}error`)).rejects.toThrow(
			"HTTP 503",
		);
	} finally {
		server.stop(true);
	}
});

test("supports the Swagger 2.0 definitions, body and response schema layout", async () => {
	const files = await new OpenAPIGenerator({
		swagger: "2.0",
		info: { version: "10.3" },
		definitions: {
			User: { type: "object", properties: { id: { type: "integer" } } },
		},
		paths: {
			"/getUser": {
				post: {
					parameters: [
						{
							in: "body",
							name: "body",
							schema: {
								type: "object",
								required: ["id"],
								properties: { id: { type: "integer" } },
							},
						},
					],
					responses: { "200": { schema: { $ref: "#/definitions/User" } } },
				},
			},
		},
	}).generate();
	expect(files["methods.d.ts"]).toContain(
		"getUser: CallAPI<Params.GetUserParams, Objects.TelegramUser>",
	);
});

test("comparison ignores docs, field order, union order, parentheses and interface/type syntax", () => {
	const before = {
		"objects.d.ts":
			"/** old */ export interface Foo { a?: (string | number); b: true }",
	};
	const after = {
		"objects.d.ts":
			'/** new */ export type Foo = { b: true; "a"?: number | string }',
	};
	const result = compareDeclarations(before, after);
	// Property quote style is normalized in both declarations.
	expect(result).toEqual({ added: [], removed: [], changed: [] });
});

test("comparison reports added/removed declarations and changes in field requiredness/type", () => {
	const result = compareDeclarations(
		{
			"objects.d.ts":
				"export type Gone = string; export interface Foo { value?: string; old: true }",
		},
		{
			"objects.d.ts":
				"export type Added = number; export interface Foo { value: number; next: false }",
		},
	);
	expect(result.added).toEqual(["objects.d.ts:Added"]);
	expect(result.removed).toEqual(["objects.d.ts:Gone"]);
	expect(result.changed[0].members).toEqual({
		added: ["next"],
		removed: ["old"],
		changed: ["value"],
	});
});
