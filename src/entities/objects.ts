import type {
	Field,
	Object as TGObject,
	ObjectUnknown,
	ObjectWithFields,
	ObjectWithOneOf,
} from "@gramio/schema-parser";
import { OBJECTS_PREFIX } from "../config";
import { CodeGenerator, TextEditor } from "../helpers";
import type { FieldContext } from "./properties";
import { Properties, fieldToType } from "./properties";

/** Local shape for ObjectWithEnum — new variant emitted by updated schema-parser. */
type ObjectWithEnum = { name: string; anchor: string; description?: string; type: "enum"; values: string[] };

const TG_DOCS = "https://core.telegram.org/bots/api/";

export class Objects {
	static generateMany(objects: TGObject[], markupTypes: Set<string> = new Set()) {
		return objects.flatMap((o) => Objects.generate(o, markupTypes));
	}

	static generate(object: TGObject, markupTypes: Set<string> = new Set()): string[] {
		const name = OBJECTS_PREFIX + object.name;
		const GENERICS: Record<string, string> = {
			APIResponseOk: "<Methods extends keyof APIMethods = keyof APIMethods>",
			APIResponse: "<Methods extends keyof APIMethods = keyof APIMethods>",
		};
		const generic = GENERICS[object.name] ?? "";
		const doc = `${object.description ?? ""}\n\n[Documentation](${TG_DOCS}${object.anchor})`;

		// ── File upload type — ObjectWithFile (InputFile) ───────────────────
		if (object.type === "file") {
			return [
				"",
				...CodeGenerator.generateComment(doc),
				`export type ${name} = Blob`,
				"",
			];
		}

		// ── String enum object — ObjectWithEnum (e.g. Currencies) ──────────
		if (object.type === "enum") {
			return [
				"",
				...CodeGenerator.generateComment(doc),
				`export type ${name} = ${object.values.map((v) => `"${v}"`).join(" | ")}`,
				"",
			];
		}

		// ── Union type (e.g. ChatMember → ChatMemberOwner | … ) ─────────────
		if (object.type === "oneOf") {
			const ctx: FieldContext = {
				objectName: object.name,
				objectType: "object",
				markupTypes,
			};
			const union = (object as ObjectWithOneOf).oneOf
				.map((f) => fieldToType(f as Field, ctx))
				.join(" | ");
			return [
				"",
				...CodeGenerator.generateComment(doc),
				`export type ${name + generic} = ${union}`,
				"",
			];
		}

		// ── Empty / marker object (e.g. ForumTopicClosed, CallbackGame) ─────
		if (object.type === "unknown") {
			return [
				"",
				...CodeGenerator.generateComment(doc),
				`export interface ${name + generic} {}`,
				"",
			];
		}

		// ── Object with fields ────────────────────────────────────────────────
		const fieldsObject = object as ObjectWithFields;
		const ctx: FieldContext = {
			objectName: object.name,
			objectType: "object",
			markupTypes,
		};

		// Collect enum union type aliases for fields that have string/integer enums
		const unionTypes = fieldsObject.fields
			.filter(
				(f): f is Field & { enum: (string | number)[] } =>
					(f.type === "string" || f.type === "integer") &&
					"enum" in f &&
					Array.isArray((f as any).enum) &&
					// Guard: skip non-numeric values in integer enums (Dice.value parser bug)
					!(
						f.type === "integer" &&
						(f as any).enum.some((v: unknown) => typeof v !== "number")
					),
			)
			.map((f) =>
				CodeGenerator.generateUnionType(
					OBJECTS_PREFIX +
						object.name +
						TextEditor.uppercaseFirstLetter(
							TextEditor.fromSnakeToCamelCase(f.key),
						),
					(f as any).enum as string[],
					f.type === "integer" ? "number" : "string",
				),
			);

		return [
			...unionTypes,
			"",
			...CodeGenerator.generateComment(doc),
			`export interface ${name + generic} {`,
			...Properties.convertMany(fieldsObject.fields, ctx).flat(),
			"}",
			"",
		];
	}
}
