import { OBJECTS_PREFIX } from "../config";
import { CodeGenerator, TextEditor } from "../helpers";
import type { IBotAPI, TObjectType } from "../types";

type TTypeRemapper = Record<
	IBotAPI.IType,
	(
		property: IBotAPI.IProperty,
		object: IBotAPI.IObject,
		objectType: TObjectType,
		parentProperty?: IBotAPI.IProperty,
	) => string
>;

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
		if (property.name === "media")
			return `${
				(objectType === "object" ? "" : "Objects.") + OBJECTS_PREFIX
			}InputFile | string`;

		// ![INFO] better typings for https://core.telegram.org/bots/api#formatting-options
		if (property.name === "parse_mode")
			return `"HTML" | "MarkdownV2" | "Markdown"`;

		// ![INFO] for better UX with FormattableString and toString'able classes :#
		if (
			property.description?.includes("after entities parsing") ||
			property.name === "message_text" ||
			(object?.name === "InputPollOption" && property.name === "text") ||
			(object.name === "sendPoll" && property.name === "question")
		)
			return "(string | { toString(): string})";

		if (property.description?.includes("ISO 4217"))
			return `${
				(objectType === "object" ? "" : "Objects.") + OBJECTS_PREFIX
			}Currencies`;

		if (parentProperty?.name === "allowed_updates")
			return `Exclude<keyof ${
				(objectType === "object" ? "" : "Objects.") + OBJECTS_PREFIX
			}Update, "update_id">`;

		// [INFO] "@sda" as string... works harder with for example .env files
		// if (parentProperty?.description?.includes("format `@"))
		// 	return "`@${string}`";

		if (property.enumeration)
			return (
				(objectType === "object" ? OBJECTS_PREFIX : "") +
				TextEditor.uppercaseFirstLetter(object.name) +
				TextEditor.uppercaseFirstLetter(
					TextEditor.fromSnakeToCamelCase(property.name),
				)
			);

		if (property.default) return `"${property.default}"`;

		return "string";
	},
	bool: (property) => {
		if ("default" in property && property.required !== false)
			return `${property.default}`;

		return "boolean";
	},
	//[INFO] Reference to other object.
	reference: (property, _, objectType) => {
		const reference =
			(objectType === "object" ? "" : "Objects.") +
			OBJECTS_PREFIX +
			// TODO: maybe this uppercase useless?
			TextEditor.uppercaseFirstLetter(property.reference!);

		// ![INFO] Some hack for better DX with @gramio/keyboards
		if (markups.includes(property.reference!))
			return `${reference} | { toJSON(): ${reference} }`;

		return reference;
	},
	any_of: (property, object, objectType) => {
		return property
			.any_of!.map((x) =>
				typesRemapper[x.type](x, object, objectType, property),
			)
			.join(" | ");
	},
	array: (property, object, objectType) => {
		const type = typesRemapper[property.array!.type](
			property.array!,
			object,
			objectType,
			property,
		);

		return `(${type})[]`;
	},
};

export class Properties {
	static convertMany(
		object: IBotAPI.IObject,
		properties: IBotAPI.IProperty[],
		objectType: TObjectType,
	) {
		return properties.map((property) =>
			Properties.convert(object, property, objectType),
		);
	}

	static convert(
		object: IBotAPI.IObject,
		property: IBotAPI.IProperty,
		objectType: TObjectType,
	) {
		const type = typesRemapper[property.type](property, object, objectType);

		return [
			...CodeGenerator.generateComment(property.description),
			`${property.name + (!property.required ? "?" : "")}: ${type}`,
		];
	}
}
