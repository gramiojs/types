import { IBotAPI } from "types";

export class CodeGenerator {
	static generateComment(value: string) {
		const valueLines = value.split("\n");

		return ["/**", valueLines.map((line) => `* ${line}`).join("\n"), "*/"];
	}

	static generateUnionType(name: string, enumeration: string[]) {
		return `export type ${name} = ${enumeration
			.map((value) => `"${value}"`)
			.join(" | ")}`;
	}
}

export class TextEditor {
	static uppercaseFirstLetter(text: string) {
		return text.at(0)?.toUpperCase() + text.slice(1);
	}

	static fromSnakeToCamelCase(text: string) {
		return text
			.split("_")
			.reduce(
				(prev, current, i) =>
					i === 0 ? current : prev + TextEditor.uppercaseFirstLetter(current),
				"",
			);
	}
}

export function generateHeader(
	version: IBotAPI.IVersion,
	recentChanges: IBotAPI.IRecentChangesObject,
) {
	return [
		"/**",
		`* Based on Bot API v${version.major}.${version.minor}.${version.patch} (${recentChanges.day}.${recentChanges.month}.${recentChanges.year})`,
		`* Generated at ${new Date().toLocaleString()} using {@link https://github.com/gramiojs/types | [types]} and {@link https://ark0f.github.io/tg-bot-api | [schema]} generators`,
		"*/",
	];
}
