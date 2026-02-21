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

const TG_DOCS = "https://core.telegram.org/bots/api/";

export class Objects {
	static generateMany(objects: TGObject[]) {
		return objects.flatMap(Objects.generate);
	}

	static generate(object: TGObject): string[] {
		const name = OBJECTS_PREFIX + object.name;
		// `generic` is a non-standard property injected for synthetic objects in index.ts
		const generic = (object as { generic?: string }).generic ?? "";
		const doc = `${object.description ?? ""}\n\n[Documentation](${TG_DOCS}${object.anchor})`;

		// ── Union type (e.g. ChatMember → ChatMemberOwner | … ) ─────────────
		if (object.type === "oneOf") {
			const ctx: FieldContext = {
				objectName: object.name,
				objectType: "object",
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
