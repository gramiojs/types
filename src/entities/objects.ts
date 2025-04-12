import { FieldString, Object as IObject } from "@gramio/schema-parser";
import { OBJECTS_PREFIX } from "../config";
import { CodeGenerator, TextEditor, getDocumentationLink } from "../helpers";
import { Properties, typesRemapper } from "./properties";

export class Objects {
	static generateMany(objects: IObject[]) {
		return objects.flatMap(Objects.generate);
	}

	static generate(object: IObject) {
		if (object.type === "oneOf")
			return [
				"",
				...CodeGenerator.generateComment(
					`${object.description}\n\n${getDocumentationLink(object.anchor)}`,
				),
				`export type ${
					OBJECTS_PREFIX + object.name + (object.generic ?? "")
				} = ${typesRemapper.any_of(
					//TODO: fix type error. Object any of does't require IProperty
					object,
					object,
					"object",
				)}`,
				"",
			];
		if (!object.fields?.length)
			return [
				"",
				...CodeGenerator.generateComment(
					`${object.description}\n\n${getDocumentationLink(object.anchor)}`,
				),
				`export interface ${
					OBJECTS_PREFIX + object.name + (object.generic ?? "")
				} {}`,
				"",
			];

		const unionTypes = object.fields
			.filter(
				(property): property is FieldString =>
					property.type === "string" && property.enum !== undefined,
			)
			.map((property) =>
				CodeGenerator.generateUnionType(
					OBJECTS_PREFIX +
						object.name +
						TextEditor.uppercaseFirstLetter(
							TextEditor.fromSnakeToCamelCase(property.key),
						),
					property.enum as string[],
				),
			);

		return [
			...unionTypes,
			"",
			...CodeGenerator.generateComment(
				`${object.description}\n\n${getDocumentationLink(object.anchor)}`,
			),
			`export interface ${
				OBJECTS_PREFIX + object.name + (object.generic ?? "")
			} {`,
			...Properties.convertMany(object, object.fields, "object").flat(),
			"}",
			"",
		];
	}
}
