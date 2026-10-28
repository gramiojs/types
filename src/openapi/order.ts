import prettier from "prettier";
import ts from "typescript";
import { PRETTIER_OPTIONS } from "../config";

function ordered<T>(
	items: readonly T[],
	previous: readonly T[],
	key: (item: T) => string,
): T[] {
	const positions = new Map(previous.map((item, index) => [key(item), index]));
	return [...items].sort(
		(a, b) =>
			(positions.get(key(a)) ?? Number.POSITIVE_INFINITY) -
			(positions.get(key(b)) ?? Number.POSITIVE_INFINITY),
	);
}

function typeKey(node: ts.TypeNode): string {
	if (ts.isParenthesizedTypeNode(node)) return typeKey(node.type);
	return node.getText().replace(/\s+/g, "");
}

/** Only order is borrowed from the baseline; types and docs always come from JSON. */
export async function preserveOrder(
	source: string,
	baseline: string,
): Promise<string> {
	const current = ts.createSourceFile(
		"current.d.ts",
		source,
		ts.ScriptTarget.Latest,
		true,
	);
	const previous = ts.createSourceFile(
		"previous.d.ts",
		baseline,
		ts.ScriptTarget.Latest,
		true,
	);
	const memberKey = (node: ts.TypeElement) =>
		node.name
			? ts.isStringLiteral(node.name)
				? node.name.text
				: node.name.getText()
			: node.getText();
	const declarationKey = (node: ts.Statement) =>
		ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)
			? node.name.text
			: undefined;

	function typeText(node: ts.TypeNode, old: ts.TypeNode): string {
		if (ts.isParenthesizedTypeNode(old)) return typeText(node, old.type);
		if (ts.isParenthesizedTypeNode(node))
			return `(${typeText(node.type, old)})`;
		if (
			(ts.isUnionTypeNode(node) && ts.isUnionTypeNode(old)) ||
			(ts.isIntersectionTypeNode(node) && ts.isIntersectionTypeNode(old))
		) {
			const oldTypes = new Map(old.types.map((type) => [typeKey(type), type]));
			return ordered(node.types, old.types, typeKey)
				.map((type) => {
					const oldType = oldTypes.get(typeKey(type));
					return oldType ? typeText(type, oldType) : type.getText();
				})
				.join(ts.isUnionTypeNode(node) ? " | " : " & ");
		}
		if (ts.isArrayTypeNode(node) && ts.isArrayTypeNode(old))
			return `(${typeText(node.elementType, old.elementType)})[]`;
		if (
			ts.isTypeReferenceNode(node) &&
			ts.isTypeReferenceNode(old) &&
			node.typeName.getText() === old.typeName.getText() &&
			node.typeArguments &&
			old.typeArguments &&
			node.typeArguments.length === old.typeArguments.length
		) {
			const oldArguments = old.typeArguments;
			return `${node.typeName.getText()}<${node.typeArguments
				.map((type, index) => typeText(type, oldArguments[index]))
				.join(", ")}>`;
		}
		return node.getText();
	}

	function statementText(node: ts.Statement, old?: ts.Statement): string {
		if (
			ts.isInterfaceDeclaration(node) &&
			old &&
			ts.isInterfaceDeclaration(old) &&
			node.members.length
		) {
			const oldMembers = new Map(
				old.members.map((member) => [memberKey(member), member]),
			);
			const members = ordered(node.members, old.members, memberKey).map(
				(member) => {
					const oldMember = oldMembers.get(memberKey(member));
					if (
						ts.isPropertySignature(member) &&
						member.type &&
						oldMember &&
						ts.isPropertySignature(oldMember) &&
						oldMember.type
					)
						return (
							source.slice(member.getFullStart(), member.type.getStart()) +
							typeText(member.type, oldMember.type) +
							source.slice(member.type.end, member.end)
						);
					return source.slice(member.getFullStart(), member.end);
				},
			);
			return (
				source.slice(node.getFullStart(), node.members.pos) +
				members.join("") +
				source.slice(node.members.end, node.end)
			);
		}
		if (
			ts.isTypeAliasDeclaration(node) &&
			old &&
			ts.isTypeAliasDeclaration(old)
		)
			return (
				source.slice(node.getFullStart(), node.type.getStart()) +
				typeText(node.type, old.type) +
				source.slice(node.type.end, node.end)
			);
		return source.slice(node.getFullStart(), node.end);
	}

	const oldDeclarations = new Map(
		previous.statements.map((node) => [declarationKey(node), node]),
	);
	const declarations = current.statements.filter(
		(node) => declarationKey(node) !== undefined,
	);
	const previousDeclarations = previous.statements.filter(
		(node) => declarationKey(node) !== undefined,
	);
	const sorted = ordered(
		declarations,
		previousDeclarations,
		(node) => declarationKey(node) ?? "",
	);
	let index = 0;
	const result = current.statements
		.map((node, statementIndex) => {
			const declaration =
				declarationKey(node) === undefined ? node : sorted[index++];
			const text = statementText(
				declaration,
				oldDeclarations.get(declarationKey(declaration)),
			).trim();
			const separator =
				statementIndex === 0
					? ""
					: ts.isImportDeclaration(node) &&
						  ts.isImportDeclaration(current.statements[statementIndex - 1])
					  ? "\n"
					  : "\n\n";
			return separator + text;
		})
		.join("");
	return prettier.format(result, PRETTIER_OPTIONS);
}
