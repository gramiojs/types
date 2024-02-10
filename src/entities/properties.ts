import { OBJECTS_PREFIX } from "../config";
import { CodeGenerator, TextEditor } from "../helpers";
import { IBotApi, TObjectType } from "../types";

type TTypeRemapper = Record<
	IBotApi.IType,
	(
		property: IBotApi.IProperty,
		object: IBotApi.IObject,
		objectType: TObjectType,
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
	string: (property: IBotApi.IProperty, object, objectType) => {
		//TODO: maybe place it to another place?
		if (property.name === "media")
			return `${
				(objectType === "object" ? "" : "Objects.") + OBJECTS_PREFIX
			}InputFile | string`;

		// ![INFO] better typings for https://core.telegram.org/bots/api#formatting-options
		if (property.name === "parse_mode")
			return `"HTML" | "MarkdownV2" | "Markdown"`;

		// ![INFO] for better UX with FormattableString (sorry)
		if (
			property.description?.includes("after entities parsing") ||
			property.name === "message_text"
		)
			return `(string | {
			text: string;
			entities: ${
				objectType === "object" ? "" : "Objects."
			}TelegramMessageEntity[];})`;

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
			.any_of!.map((x) => typesRemapper[x.type](x, object, objectType))
			.join(" | ");
	},
	array: (property, object, objectType) => {
		const type = typesRemapper[property.array!.type](
			property.array!,
			object,
			objectType,
		);

		return `(${type})[]`;
	},
};

export class Properties {
	static convertMany(
		object: IBotApi.IObject,
		properties: IBotApi.IProperty[],
		objectType: TObjectType,
	) {
		return properties.map((property) =>
			Properties.convert(object, property, objectType),
		);
	}

	static convert(
		object: IBotApi.IObject,
		property: IBotApi.IProperty,
		objectType: TObjectType,
	) {
		const type = typesRemapper[property.type](property, object, objectType);

		return [
			...CodeGenerator.generateComment(property.description),
			`${property.name + (!property.required ? "?" : "")}: ${type}`,
		];
	}
}
