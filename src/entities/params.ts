import { CodeGenerator, TextEditor } from "../helpers";
import type { IBotAPI } from "../types";
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
			.map((argument) => {
				return CodeGenerator.generateUnionType(
					TextEditor.uppercaseFirstLetter(method.name) +
						TextEditor.uppercaseFirstLetter(
							TextEditor.fromSnakeToCamelCase(argument.name),
						),
					method.name === "postStory" && argument.name === "active_period"
						? [6 * 3600, 12 * 3600, 86400, 2 * 86400]
						: (argument.enumeration as string[]),
					argument.type === "integer" || argument.type === "float"
						? "number"
						: "string",
				);
			});

		return [
			...unionTypes,
			"",
			...CodeGenerator.generateComment(
				`Params object for {@link APIMethods.${method.name} | ${method.name}} method`,
			),
			`export interface ${`${TextEditor.uppercaseFirstLetter(
				method.name,
			)}Params`} {`,
			...Properties.convertMany(method, method.arguments, "method").flat(),
			"}",
			"",
		];
	}
}
