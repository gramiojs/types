import ts from "typescript";

export interface DeclarationChange {
	name: string;
	before: string;
	after: string;
	/** Field/method signatures, excluding documentation and formatting. */
	members: { added: string[]; removed: string[]; changed: string[] };
}

function declarations(files: Record<string, string>) {
	const result = new Map<
		string,
		{ signature: string; members: Map<string, string> }
	>();
	const printer = ts.createPrinter({ removeComments: true });
	for (const [filename, source] of Object.entries(files)) {
		const file = ts.createSourceFile(
			filename,
			source,
			ts.ScriptTarget.Latest,
			true,
		);
		const print = (node: ts.Node) => {
			const transformed = ts.transform(node, [
				(context) => {
					const visit: ts.Visitor = (original) => {
						const current = ts.visitEachChild(original, visit, context);
						if (ts.isStringLiteral(current))
							return ts.factory.createStringLiteral(current.text);
						if (ts.isParenthesizedTypeNode(current)) return current.type;
						if (
							ts.isUnionTypeNode(current) ||
							ts.isIntersectionTypeNode(current)
						) {
							const union = ts.isUnionTypeNode(current);
							const types = current.types.flatMap((type) =>
								(union && ts.isUnionTypeNode(type)) ||
								(!union && ts.isIntersectionTypeNode(type))
									? [...type.types]
									: [type],
							);
							types.sort((a, b) =>
								printer
									.printNode(ts.EmitHint.Unspecified, a, file)
									.localeCompare(
										printer.printNode(ts.EmitHint.Unspecified, b, file),
									),
							);
							return union
								? ts.factory.createUnionTypeNode(types)
								: ts.factory.createIntersectionTypeNode(types);
						}
						return current;
					};
					return (root) => ts.visitNode(root, visit) ?? root;
				},
			]);
			try {
				return printer.printNode(
					ts.EmitHint.Unspecified,
					transformed.transformed[0],
					file,
				);
			} finally {
				transformed.dispose();
			}
		};
		for (const node of file.statements) {
			if (!ts.isInterfaceDeclaration(node) && !ts.isTypeAliasDeclaration(node))
				continue;
			const members = ts.isInterfaceDeclaration(node)
				? node.members
				: ts.isTypeLiteralNode(node.type)
				  ? node.type.members
				  : [];
			const memberMap = new Map<string, string>();
			for (const member of members)
				if (member.name) {
					const name = ts.isStringLiteral(member.name)
						? member.name.text
						: member.name.getText(file);
					// Object property quotes do not change a TypeScript contract.
					const normalized = ts.isPropertySignature(member)
						? ts.factory.updatePropertySignature(
								member,
								member.modifiers,
								ts.factory.createStringLiteral(name),
								member.questionToken,
								member.type,
						  )
						: member;
					memberMap.set(name, print(normalized));
				}
			const generics = node.typeParameters?.map(print).join(", ") ?? "";
			const signature = members.length
				? `<${generics}>{${[...memberMap]
						.sort(([a], [b]) => a.localeCompare(b))
						.map(([, value]) => value)
						.join("\n")}}${
						ts.isInterfaceDeclaration(node)
							? node.heritageClauses?.map(print).join(" ") ?? ""
							: ""
				  }`
				: ts.isTypeAliasDeclaration(node)
				  ? `<${generics}>${print(node.type)}`
				  : `<${generics}>{}`;
			result.set(`${filename}:${node.name.text}`, {
				signature,
				members: memberMap,
			});
		}
	}
	return result;
}

/** Declaration-level diff, not a proof of TypeScript assignability. */
export function compareDeclarations(
	beforeFiles: Record<string, string>,
	afterFiles: Record<string, string>,
) {
	const before = declarations(beforeFiles);
	const after = declarations(afterFiles);
	const added = [...after.keys()].filter((name) => !before.has(name)).sort();
	const removed = [...before.keys()].filter((name) => !after.has(name)).sort();
	const changed: DeclarationChange[] = [];
	for (const [name, declaration] of after) {
		const previous = before.get(name);
		if (!previous || declaration.signature === previous.signature) continue;
		changed.push({
			name,
			before: previous.signature,
			after: declaration.signature,
			members: {
				added: [...declaration.members.keys()].filter(
					(key) => !previous.members.has(key),
				),
				removed: [...previous.members.keys()].filter(
					(key) => !declaration.members.has(key),
				),
				changed: [...declaration.members.keys()].filter(
					(key) =>
						previous.members.has(key) &&
						previous.members.get(key) !== declaration.members.get(key),
				),
			},
		});
	}
	return { added, removed, changed };
}
