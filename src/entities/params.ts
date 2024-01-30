import { CodeGenerator, TextEditor } from "../helpers";
import { IBotApi } from "../types";
import { Properties } from "./properties";

//TODO: unify and refactor
export class Params {
	static generateMany(methods: IBotApi.IMethod[]) {
		return methods.flatMap(Params.generate);
	}

	static generate(method: IBotApi.IMethod) {
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
