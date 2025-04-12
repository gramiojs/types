import { Method } from "@gramio/schema-parser";
import { CodeGenerator, TextEditor, getDocumentationLink } from "../helpers";
import { typesRemapper } from "./properties";

function generateMethod(method: Method) {
	const returnType = typesRemapper[method.returns.type](
		// @ts-expect-error
		method.returns,
		method,
		"method",
	);

	if (!method.parameters?.length)
		return `${method.name}: CallAPIWithoutParams<${returnType}>`;

	const tCallType = method.parameters.every((argument) => !argument.required)
		? "CallAPIWithOptionalParams"
		: "CallAPI";

	return `${
		method.name
	}: ${tCallType}<Params.${`${TextEditor.uppercaseFirstLetter(
		method.name,
	)}Params`}, ${returnType}>`;
}

export class APIMethods {
	static generateMany(methods: Method[]) {
		return [
			...CodeGenerator.generateComment(
				`This object is a map of ${getDocumentationLink(
					"#available-methods",
					"API methods",
				)} types (functions map with input/output)`,
			),
			"export interface APIMethods {",
			...methods.flatMap(APIMethods.generate),
			"}",
		];
	}

	static generate(method: Method) {
		return [
			...CodeGenerator.generateComment(
				`${method.description}\n\n${getDocumentationLink(method.anchor)}`,
			),
			generateMethod(method),
		];
	}
}
