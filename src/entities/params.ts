import type { Field, Method } from "@gramio/schema-parser";
import { CodeGenerator, TextEditor } from "../helpers";
import type { FieldContext } from "./properties";
import { Properties } from "./properties";

export class Params {
	static generateMany(methods: Method[]) {
		return methods.flatMap(Params.generate);
	}

	static generate(method: Method) {
		if (!method.parameters.length) return [];

		const ctx: FieldContext = {
			objectName: method.name,
			objectType: "method",
		};

		// Collect enum union type aliases for parameters that carry string/integer enums
		const unionTypes = method.parameters
			.filter(
				(p): p is Field & { enum: (string | number)[] } =>
					(p.type === "string" || p.type === "integer") &&
					"enum" in p &&
					Array.isArray((p as any).enum),
			)
			.map((p) =>
				CodeGenerator.generateUnionType(
					TextEditor.uppercaseFirstLetter(method.name) +
						TextEditor.uppercaseFirstLetter(
							TextEditor.fromSnakeToCamelCase(p.key),
						),
					(p as any).enum as string[],
					p.type === "integer" || p.type === "float" ? "number" : "string",
				),
			);

		return [
			...unionTypes,
			"",
			...CodeGenerator.generateComment(
				`Params object for {@link APIMethods.${method.name} | ${method.name}} method`,
			),
			`export interface ${TextEditor.uppercaseFirstLetter(method.name)}Params {`,
			...Properties.convertMany(method.parameters, ctx).flat(),
			"}",
			"",
		];
	}
}
