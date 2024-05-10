import { CodeGenerator, TextEditor } from "../helpers";
import type { IBotAPI } from "../types";
import { typesRemapper } from "./properties";

function generateMethod(method: IBotAPI.IMethod) {
	const returnType = typesRemapper[method.return_type.type](
		method.return_type,
		method,
		"method",
	);

	if (!method.arguments?.length)
		return `${method.name}: CallAPIWithoutParams<${returnType}>`;

	const tCallType = method.arguments.every((argument) => !argument.required)
		? "CallAPIWithOptionalParams"
		: "CallAPI";

	return `${
		method.name
	}: ${tCallType}<Params.${`${TextEditor.uppercaseFirstLetter(
		method.name,
	)}Params`}, ${returnType}>`;
}

export class APIMethods {
	static generateMany(methods: IBotAPI.IMethod[]) {
		return [
			...CodeGenerator.generateComment(
				"This object is a map of [API methods](https://core.telegram.org/bots/api#available-methods) types (functions map with input/output)",
			),
			"export interface APIMethods {",
			...methods.flatMap(APIMethods.generate),
			"}",
		];
	}

	static generate(method: IBotAPI.IMethod) {
		return [
			...CodeGenerator.generateComment(
				`${method.description}\n\n[Documentation](${method.documentation_link})`,
			),
			generateMethod(method),
		];
	}
}
