import type { Version } from "@gramio/schema-parser";

export class CodeGenerator {
	static generateComment(value: string | string[]) {
		const valueLines = typeof value === "string" ? value.split("\n") : value;

		return ["/**", valueLines.map((line) => `* ${line}`).join("\n"), "*/"];
	}

	static generateUnionType(
		name: string,
		enumeration: string[] | number[],
		type: "number" | "string" = "string",
	) {
		return `export type ${name} = ${enumeration
			.map((value) => (type === "number" ? `${value}` : `"${value}"`))
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
	const { major, minor, release_date } = version;
	const dateStr = `${String(release_date.day).padStart(2, "0")}.${String(
		release_date.month,
	).padStart(2, "0")}.${release_date.year}`;

	return (description: string, additional: string[] = []) => [
		"/**",
		"* @module",
		"* ",
		`* ${description}`,
		"* ",
		...additional.map((x) => `* ${x}`),
		"* ",
		`* Based on Bot API v${major}.${minor} (${dateStr})`,
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
