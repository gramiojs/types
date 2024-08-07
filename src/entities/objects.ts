import { OBJECTS_PREFIX } from "../config";
import { CodeGenerator, TextEditor } from "../helpers";
import type { IBotAPI } from "../types";
import { Properties, typesRemapper } from "./properties";

export class Objects {
	static generateMany(objects: IBotAPI.IObject[]) {
		return objects.flatMap(Objects.generate);
	}

	static generate(object: IBotAPI.IObject) {
		if (object.type === "any_of")
			return [
				"",
				...CodeGenerator.generateComment(
					`${object.description}\n\n[Documentation](${object.documentation_link})`,
				),
				`export type ${OBJECTS_PREFIX + object.name + (object.generic ?? "")} = ${typesRemapper.any_of(
					//TODO: fix type error. Object any of does't require IProperty
					object as unknown as IBotAPI.IProperty,
					object,
					"object",
				)}`,
				"",
			];
		if (!object.properties?.length)
			return [
				"",
				...CodeGenerator.generateComment(
					`${object.description}\n\n[Documentation](${object.documentation_link})`,
				),
				`export interface ${OBJECTS_PREFIX + object.name + (object.generic ?? "")} {}`,
				"",
			];

		const unionTypes = object.properties
			.filter((property) => property.enumeration)
			.map((property) =>
				CodeGenerator.generateUnionType(
					OBJECTS_PREFIX +
						object.name +
						TextEditor.uppercaseFirstLetter(
							TextEditor.fromSnakeToCamelCase(property.name),
						),
					property.enumeration as string[],
				),
			);

		return [
			...unionTypes,
			"",
			...CodeGenerator.generateComment(
				`${object.description}\n\n[Documentation](${object.documentation_link})`,
			),
			`export interface ${OBJECTS_PREFIX + object.name + (object.generic ?? "")} {`,
			...Properties.convertMany(object, object.properties, "object").flat(),
			"}",
			"",
		];
	}
}
