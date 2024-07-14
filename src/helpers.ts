import type { IBotAPI } from "./types";

export class CodeGenerator {
	static generateComment(value: string | string[]) {
		const valueLines = typeof value === "string" ? value.split("\n") : value;

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
	return (description: string, additional: string[] = []) => [
		"/**",
		"* @module",
		"* ",
		`* ${description}`,
		"* ",
		...additional.map((x) => `* ${x}`),
		"* ",
		`* Based on Bot API v${version.major}.${version.minor}.${
			version.patch
		} (${String(recentChanges.day).padStart(2, "0")}.${String(
			recentChanges.month,
		).padStart(2, "0")}.${recentChanges.year})`,
		"* ",
		`* Generated at ${new Date().toLocaleString(
			"ru",
		)} using [types](https://github.com/gramiojs/types) and [schema](https://ark0f.github.io/tg-bot-api) generators`,
		"*/",
		"",
		"",
	];
}

export async function fetchCurrencies() {
	const res = await fetch(
		"https://core.telegram.org/bots/payments/currencies.json",
	);
	const data = await res.json();

	return Object.keys(data);
}
