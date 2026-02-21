import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import { EOL } from "node:os";
import { getCustomSchema } from "@gramio/schema-parser";
import { version } from "../package.json";

const schema = await getCustomSchema();
const hash = createHash("sha1")
	.update(JSON.stringify(schema.version))
	.digest("hex");

const previousHash = await fs.readFile("./hash.txt").then(String);
if (previousHash === hash) {
	console.log("No changes in Telegram Bot API Schema");
	process.exit(1);
}

const [major, minor] = version.split(".").map(Number);

if (major !== schema.version.major || minor !== schema.version.minor) {
	execSync(
		`npm pkg set version=${schema.version.major}.${schema.version.minor}.0`,
	);
} else execSync("npm version patch --no-git-tag-version");

await fs.writeFile("./hash.txt", hash);

if (process.env.GITHUB_OUTPUT) {
	const version = String(execSync("npm pkg get version"));

	await fs.appendFile(
		process.env.GITHUB_OUTPUT!,
		`version=${version.replace(/"/gi, "")}${EOL}`,
	);
}
