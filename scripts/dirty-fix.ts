import { createHash } from "node:crypto";
import fs from "node:fs/promises";

const NON_FIXED_HASH = "5f2afb36f6a4c3b65abd4e1b1ed4f4f19ebcf418";

const schemaFile = await fs.readFile("./tg-bot-api/src/extractor.rs");
const hash = createHash("sha1").update(schemaFile).digest("hex");

if (NON_FIXED_HASH !== hash) {
	console.error(
		"We need review from types maintainer. is it https://github.com/ark0f/tg-bot-api/issues/20 fixed?",
	);
	process.exit(1);
}

await fs.copyFile(
	"./scripts/extractor.patch.rs",
	"./tg-bot-api/src/extractor.rs",
);
