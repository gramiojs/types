import { CodeGenerator, TextEditor } from "../helpers";
import { IBotAPI } from "../types";
import { Properties } from "./properties";

//TODO: unify and refactor
export class Params {
	static generateMany(methods: IBotAPI.IMethod[]) {
		return methods.flatMap(Params.generate);
	}

	static generate(method: IBotAPI.IMethod) {
		if (!method.arguments?.length) return [];

		const unionTypes = method.arguments
			.filter((argument) => argument.enumeration)
			.map((argument) =>
				CodeGenerator.generateUnionType(
					TextEditor.uppercaseFirstLetter(method.name) +
						TextEditor.uppercaseFirstLetter(
							TextEditor.fromSnakeToCamelCase(argument.name),
						),
					argument.enumeration as string[],
				),
			);

		return [
			...unionTypes,
			"",
			`export interface ${`${TextEditor.uppercaseFirstLetter(
				method.name,
			)}Params`} {`,
			...Properties.convertMany(method, method.arguments, "method").flat(),
			"}",
			"",
		];
	}
}
