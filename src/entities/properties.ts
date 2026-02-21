import type { Field, FieldInteger, FieldString } from "@gramio/schema-parser";
import { OBJECTS_PREFIX } from "../config";
import { CodeGenerator, TextEditor } from "../helpers";
import type { TObjectType } from "../types";

const markups = [
	"ReplyKeyboardMarkup",
	"InlineKeyboardMarkup",
	"ReplyKeyboardRemove",
	"ForceReply",
];

export type FieldContext = {
	/** Name of the enclosing object or method. */
	objectName: string;
	objectType: TObjectType;
	/** The direct parent field (e.g. the `array` field when resolving `arrayOf`). */
	parentField?: Field;
};

function objectsPrefix(objectType: TObjectType) {
	return objectType === "object" ? "" : "Objects.";
}

/**
 * Map a single `Field` to its TypeScript type string.
 *
 * The `ctx.parentField` is set when recursing into `arrayOf` / `variants`
 * so that checks like `allowed_updates` work correctly.
 */
export function fieldToType(field: Field, ctx: FieldContext): string {
	switch (field.type) {
		case "float":
			return "number";

		case "integer": {
			// Guard: skip non-numeric enum values (parser bug — Dice.value gets
			// emoji strings placed in an integer field's enum).
			if (
				field.enum &&
				field.enum.every((v) => typeof v === "number")
			)
				return (
					(ctx.objectType === "object" ? OBJECTS_PREFIX : "") +
					TextEditor.uppercaseFirstLetter(ctx.objectName) +
					TextEditor.uppercaseFirstLetter(
						TextEditor.fromSnakeToCamelCase(field.key),
					)
				);
			return "number";
		}

		case "string": {
			// InputFile | string — media / thumbnail fields and explicit flag in description
			if (
				field.key === "media" ||
				(ctx.objectName.includes("InputMedia") && field.key === "thumbnail") ||
				field.description?.includes("More information on Sending Files")
			)
				return `${objectsPrefix(ctx.objectType) + OBJECTS_PREFIX}InputFile | string`;

			// Parse-mode literal union
			if (field.key?.includes("parse_mode"))
				return `"HTML" | "MarkdownV2" | "Markdown"`;

			// FormattableString compatible — text-with-entities fields
			if (
				field.description?.includes("after entities parsing") ||
				field.key === "message_text" ||
				(ctx.objectName === "InputPollOption" && field.key === "text") ||
				(ctx.objectName === "sendPoll" && field.key === "question") ||
				(ctx.objectName === "sendGift" && field.key === "text") ||
				(ctx.objectName === "giftPremiumSubscription" && field.key === "text") ||
				(ctx.objectName === "ChecklistTask" && field.key === "text") ||
				(ctx.objectName === "Checklist" && field.key === "title")
			)
				return "(string | { toString(): string})";

			// Currency code — ISO 4217
			if (field.description?.includes("ISO 4217"))
				return `${objectsPrefix(ctx.objectType) + OBJECTS_PREFIX}Currencies`;

			// Update type discriminator inside allowed_updates array
			if (ctx.parentField?.key === "allowed_updates")
				return `Exclude<keyof ${
					objectsPrefix(ctx.objectType) + OBJECTS_PREFIX
				}Update, "update_id">`;

			// String enum → generate a named union type alias (referenced here)
			if (field.enum)
				return (
					(ctx.objectType === "object" ? OBJECTS_PREFIX : "") +
					TextEditor.uppercaseFirstLetter(ctx.objectName) +
					TextEditor.uppercaseFirstLetter(
						TextEditor.fromSnakeToCamelCase(field.key),
					)
				);

			// Discriminator literal — `default` (e.g. "creator") or `const`
			if (field.default) return `"${field.default}"`;
			if (field.const) return `"${field.const}"`;

			return "string";
		}

		case "boolean": {
			// `const: true` / `const: false` → literal type (e.g. User.is_premium)
			if (field.const !== undefined) return `${field.const}`;
			return "boolean";
		}

		case "reference": {
			const refName =
				objectsPrefix(ctx.objectType) +
				OBJECTS_PREFIX +
				TextEditor.uppercaseFirstLetter(field.reference.name);

			// Keyboard markup types — accept plain object OR gramio keyboard class
			if (markups.includes(field.reference.name))
				return `${refName} | { toJSON(): ${refName} }`;

			return refName;
		}

		case "array":
			return `(${fieldToType(field.arrayOf as Field, {
				...ctx,
				parentField: field,
			})})[]`;

		case "one_of":
			return field.variants
				.map((v) => fieldToType(v as Field, { ...ctx, parentField: field }))
				.join(" | ");
	}
}

// ─── Properties helper ────────────────────────────────────────────────────────

export class Properties {
	static convertMany(fields: Field[], ctx: FieldContext): string[][] {
		return fields.map((f) => Properties.convert(f, ctx));
	}

	static convert(field: Field, ctx: FieldContext): string[] {
		const type = fieldToType(field, ctx);

		return [
			...CodeGenerator.generateComment(field.description ?? ""),
			`${field.key + (!field.required ? "?" : "")}: ${type}`,
		];
	}
}
