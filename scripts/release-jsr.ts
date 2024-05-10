import { execSync } from "node:child_process";
import fs from "node:fs";

if (!fs.existsSync("./source")) fs.mkdirSync("./source");

const version = execSync("npm pkg get version")
	.toString()
	.replace(/"|\n/gi, "");

const jsrConfig = JSON.parse(String(fs.readFileSync("jsr.json")));

jsrConfig.version = version;

fs.writeFileSync("jsr.json", JSON.stringify(jsrConfig, null, 2));

for (const entry of fs.readdirSync("./out", { withFileTypes: true })) {
	if (!entry.name.endsWith(".d.ts")) continue;
	fs.copyFileSync(
		`./out/${entry.name}`,
		`./source/${entry.name.replace(".d.ts", ".ts")}`,
	);
}
