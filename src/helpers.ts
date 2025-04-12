import { Version } from "@gramio/schema-parser";
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

export function generateHeader(version: Version) {
	return (description: string, additional: string[] = []) => [
		"/**",
		"* @module",
		"* ",
		`* ${description}`,
		"* ",
		...additional.map((x) => `* ${x}`),
		"* ",
		`* Based on Bot API v${version.major}.${version.minor} (${String(
			version.release_date.day,
		).padStart(2, "0")}.${String(version.release_date.month).padStart(
			2,
			"0",
		)}.${version.release_date.year})`,
		"* ",
		`* Generated at ${new Date().toLocaleString(
			"ru",
		)} using [types](https://github.com/gramiojs/types) and [schema](https://github.com/gramiojs/schema-parser) generators`,
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

export function getDocumentationLink(anchor: string, text = "Documentation") {
	return `[${text}](https://core.telegram.org/bots/api#${anchor})`;
}

declare module "@gramio/schema-parser" {
	interface ObjectBasic {
		//t Just hack
		generic?: string;
	}
}
