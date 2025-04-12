import {
	Field,
	FieldArray,
	FieldBoolean,
	FieldFloat,
	FieldInteger,
	FieldOneOf,
	FieldReference,
	FieldString,
	Object as IObject,
} from "@gramio/schema-parser";
import { OBJECTS_PREFIX } from "../config";
import { CodeGenerator, TextEditor } from "../helpers";
import type { IBotAPI, TObjectType } from "../types";

interface TypeToObjectType {
	integer: FieldInteger;
	string: FieldString;
	boolean: FieldBoolean;
	float: FieldFloat;
	one_of: FieldOneOf;
	reference: FieldReference;
	array: FieldArray;
}

type TTypeRemapper = {
	[K in keyof TypeToObjectType]: (
		property: TypeToObjectType[K],
		object: IObject,
		objectType: TObjectType,
		parentProperty?: Field,
	) => string;
};

const markups = [
	"ReplyKeyboardMarkup",
	"InlineKeyboardMarkup",
	"ReplyKeyboardRemove",
	"ForceReply",
];

//TODO: json schema to (T, params[T])
export const typesRemapper: TTypeRemapper = {
	float: () => "number",
	integer: () => "number",
	//[INFO] no need in enumeration because union types generate before that
	string: (property, object, objectType, parentProperty) => {
		//TODO: maybe place it to another place?
		if (
			property.key === "media" ||
			(object.name.includes("InputMedia") && property.key === "thumbnail")
		)
			return `${
				(objectType === "object" ? "" : "Objects.") + OBJECTS_PREFIX
			}InputFile | string`;

		// ![INFO] better typings for https://core.telegram.org/bots/api#formatting-options
		if (property.key?.includes("parse_mode"))
			return `"HTML" | "MarkdownV2" | "Markdown"`;

		// ![INFO] for better UX with FormattableString and toString'able classes :#
		if (
			property.description?.includes("after entities parsing") ||
			property.key === "message_text" ||
			(object?.name === "InputPollOption" && property.key === "text") ||
			(object.name === "sendPoll" && property.key === "question") ||
			(object?.name === "sendGift" && property.key === "text")
		)
			return "(string | { toString(): string})";

		if (property.description?.includes("ISO 4217"))
			return `${
				(objectType === "object" ? "" : "Objects.") + OBJECTS_PREFIX
			}Currencies`;

		if (parentProperty?.key === "allowed_updates")
			return `Exclude<keyof ${
				(objectType === "object" ? "" : "Objects.") + OBJECTS_PREFIX
			}Update, "update_id">`;

		// [INFO] "@sda" as string... works harder with for example .env files
		// if (parentProperty?.description?.includes("format `@"))
		// 	return "`@${string}`";

		if ("enum" in property && property.enum)
			return (
				(objectType === "object" ? OBJECTS_PREFIX : "") +
				TextEditor.uppercaseFirstLetter(object.name) +
				TextEditor.uppercaseFirstLetter(
					TextEditor.fromSnakeToCamelCase(property.key),
				)
			);

		if ("const" in property && property.const) return `"${property.const}"`;

		return "string";
	},
	boolean: (property) => {
		if ("const" in property && property.const) return `${property.const}`;

		return "boolean";
	},
	//[INFO] Reference to other object.
	reference: (property, _, objectType) => {
		const reference =
			(objectType === "object" ? "" : "Objects.") +
			OBJECTS_PREFIX +
			// TODO: maybe this uppercase useless?
			TextEditor.uppercaseFirstLetter(property.reference.name!);

		// ![INFO] Some hack for better DX with @gramio/keyboards
		if (markups.includes(property.reference.name!))
			return `${reference} | { toJSON(): ${reference} }`;

		return reference;
	},
	one_of: (property, object, objectType) => {
		return property
			.variants!.map((x) =>
				// @ts-expect-error
				typesRemapper[x.type](x, object, objectType, property),
			)
			.join(" | ");
	},
	array: (property, object, objectType) => {
		const type = typesRemapper[property.arrayOf!.type](
			// @ts-expect-error
			property.arrayOf!,
			object,
			objectType,
			property,
		);

		return `(${type})[]`;
	},
};

export class Properties {
	static convertMany(
		object: IObject,
		properties: Field[],
		objectType: TObjectType,
	) {
		return properties.map((property) =>
			Properties.convert(object, property, objectType),
		);
	}

	static convert(object: IObject, property: Field, objectType: TObjectType) {
		// @ts-expect-error
		const type = typesRemapper[property.type](property, object, objectType);

		return [
			...CodeGenerator.generateComment(property.description ?? ""),
			`${property.key + (!property.required ? "?" : "")}: ${type}`,
		];
	}
}
