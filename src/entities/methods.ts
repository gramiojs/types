import type { Field, Method } from "@gramio/schema-parser";
import { CodeGenerator, TextEditor } from "../helpers";
import type { FieldContext } from "./properties";
import { fieldToType } from "./properties";

const TG_DOCS = "https://core.telegram.org/bots/api/";

function generateMethod(method: Method) {
	const ctx: FieldContext = { objectName: method.name, objectType: "method" };
	const returnType = fieldToType(method.returns as Field, ctx);

	if (!method.parameters.length)
		return `${method.name}: CallAPIWithoutParams<${returnType}>`;

	const tCallType = method.parameters.every((p) => !p.required)
		? "CallAPIWithOptionalParams"
		: "CallAPI";

	return `${method.name}: ${tCallType}<Params.${TextEditor.uppercaseFirstLetter(
		method.name,
	)}Params, ${returnType}>`;
}

export class APIMethods {
	static generateMany(methods: Method[]) {
		return [
			...CodeGenerator.generateComment(
				"This object is a map of [API methods](https://core.telegram.org/bots/api#available-methods) types (functions map with input/output)",
			),
			"export interface APIMethods {",
			...methods.flatMap(APIMethods.generate),
			"}",
		];
	}

	static generate(method: Method) {
		const doc = `${method.description ?? ""}\n\n[Documentation](${TG_DOCS}${method.anchor})`;
		return [
			...CodeGenerator.generateComment(doc),
			generateMethod(method),
		];
	}
}
