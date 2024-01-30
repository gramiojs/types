import { Options } from "prettier";

export const SCHEMA_FILE_PATH = "./tg-bot-api/public/dev/custom.min.json";

export const OBJECTS_PREFIX = "Telegram";

export const PRETTIER_OPTIONS: Options = {
	tabWidth: 4,
	parser: "typescript",
	endOfLine: "auto",
	semi: false,
};
