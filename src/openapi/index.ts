import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { OUTPUT_PATH } from "../config";
import { compareDeclarations } from "./compare";
import { OpenAPIGenerator } from "./generator";
import { preserveOrder } from "./order";

export const DEFAULT_SCHEMA_URL = "https://corefork.telegram.org/bots/api.json";

export async function loadDocument(source: string): Promise<unknown> {
	let text: string;
	if (/^https?:\/\//.test(source)) {
		const response = await fetch(source, {
			signal: AbortSignal.timeout(30_000),
		});
		if (!response.ok) throw new Error(`${source}: HTTP ${response.status}`);
		text = await response.text();
		if (/^\s*</.test(text))
			throw new Error(
				`${source}: expected Swagger/OpenAPI JSON, received HTML (${response.headers.get(
					"content-type",
				)}). Supply a working URL or local file with --schema. No declarations were written.`,
			);
	} else text = await fs.readFile(source, "utf8");
	try {
		return JSON.parse(text);
	} catch {
		throw new Error(`${source}: invalid JSON. No declarations were written.`);
	}
}

async function main() {
	const options = new Map<string, string>();
	const args = process.argv.slice(2);
	for (let index = 0; index < args.length; index += 2) {
		const key = args[index];
		if (
			!["--schema", "--out", "--compare", "--report"].includes(key) ||
			!args[index + 1] ||
			args[index + 1].startsWith("--")
		)
			throw new Error(
				"Usage: bun generate:openapi [--schema URL-or-file] [--out directory] [--compare legacy-directory] [--report report.json]",
			);
		options.set(key, args[index + 1]);
	}
	if (options.has("--report") && !options.has("--compare"))
		throw new Error("--report requires --compare");
	const source = options.get("--schema") ?? DEFAULT_SCHEMA_URL;
	const document = await loadDocument(source);
	const generator = new OpenAPIGenerator(document);
	const files = await generator.generate();
	const output = options.get("--out") ?? OUTPUT_PATH;
	const baseline = options.get("--compare");
	// Read before writing so regenerating into out/ retains the previous layout.
	const previous = Object.fromEntries(
		await Promise.all(
			Object.keys(files).map(async (name) => [
				name,
				await fs
					.readFile(path.join(baseline ?? output, name), "utf8")
					.catch((error: unknown) => {
						if (
							!baseline &&
							error instanceof Error &&
							"code" in error &&
							error.code === "ENOENT"
						)
							return "";
						throw error;
					}),
			]),
		),
	);
	for (const name of Object.keys(files))
		if (previous[name])
			files[name] = await preserveOrder(files[name], previous[name]);
	if (baseline) {
		const comparison = compareDeclarations(previous, files);
		console.log(
			`Declarations: +${comparison.added.length}, -${comparison.removed.length}, changed ${comparison.changed.length}`,
		);
		const report = options.get("--report");
		if (report) {
			if (
				Object.keys(files).some(
					(name) => path.resolve(report) === path.resolve(output, name),
				)
			)
				throw new Error(
					"Report path must not overwrite a generated declaration",
				);
			await fs.mkdir(path.dirname(report), { recursive: true });
			await fs.writeFile(
				report,
				`${JSON.stringify(
					{
						source,
						schemaSha256: createHash("sha256")
							.update(JSON.stringify(document))
							.digest("hex"),
						baseline,
						warnings: Object.fromEntries(generator.warnings),
						...comparison,
					},
					null,
					2,
				)}\n`,
			);
		} else console.log(JSON.stringify(comparison, null, 2));
	}
	await fs.mkdir(output, { recursive: true });
	await Promise.all(
		Object.entries(files).map(([name, text]) =>
			fs.writeFile(path.join(output, name), text),
		),
	);
	console.log(`Generated ${Object.keys(files).length} files in ${output}`);
	if (generator.warnings.size)
		console.warn(
			`Runtime validation constraints are not enforced by these declarations: ${JSON.stringify(
				Object.fromEntries(generator.warnings),
			)}`,
		);
}

if (import.meta.main)
	await main().catch((error: unknown) => {
		console.error(error instanceof Error ? error.message : String(error));
		process.exitCode = 1;
	});
