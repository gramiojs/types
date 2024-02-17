import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import { version } from "../package.json";
import { SCHEMA_FILE_PATH } from "../src/config";
import { IBotAPI } from "../src/types";

const schemaFile = await fs.readFile(SCHEMA_FILE_PATH);
const hash = createHash("sha1").update(schemaFile).digest("hex");

const previousHash = await fs.readFile("./hash.txt").then(String);
if (previousHash === hash) {
	console.log("No changes in Telegram Bot API Schema");
	process.exit(1);
}

const schema = JSON.parse(String(schemaFile)) as IBotAPI.ISchema;

const [major, minor] = version.split(".").map(Number);

if (major !== schema.version.major || minor !== schema.version.minor) {
	execSync(
		`npm pkg set version=${schema.version.major}.${schema.version.minor}.${schema.version.patch}`,
	);
} else execSync("npm version patch --no-git-tag-version");

await fs.writeFile("./hash.txt", hash);

if (process.env.GITHUB_OUTPUT) {
	const version = String(execSync("npm pkg get version"));

	await fs.appendFile(
		process.env.GITHUB_OUTPUT!,
		`version=${version.replace(/"/gi, "")}`,
	);
}
