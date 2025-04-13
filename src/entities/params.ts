import { FieldString, Method } from "@gramio/schema-parser";
import { CodeGenerator, TextEditor } from "../helpers";
import { Properties } from "./properties";

//TODO: unify and refactor
export class Params {
	static generateMany(methods: Method[]) {
		return methods.flatMap(Params.generate);
	}

	static generate(method: Method) {
		if (!method.parameters?.length) return [];

		const unionTypes = method.parameters
			.filter(
				(parameter): parameter is FieldString =>
					"enum" in parameter && !!parameter.enum?.length,
			)
			.map((parameter) =>
				CodeGenerator.generateUnionType(
					TextEditor.uppercaseFirstLetter(method.name) +
						TextEditor.uppercaseFirstLetter(
							TextEditor.fromSnakeToCamelCase(parameter.key),
						),
					parameter.enum as string[],
				),
			);

		return [
			...unionTypes,
			"",
			...CodeGenerator.generateComment(
				`Params object for {@link APIMethods.${method.name} | ${method.name}} method`,
			),
			`export interface ${`${TextEditor.uppercaseFirstLetter(
				method.name,
			)}Params`} {`,
			...Properties.convertMany(method, method.parameters, "method").flat(),
			"}",
			"",
		];
	}
}
