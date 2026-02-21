import type { Options } from "prettier";

export const OUTPUT_PATH = "./out";

export const OBJECTS_PREFIX = "Telegram";

export const PRETTIER_OPTIONS: Options = {
	tabWidth: 4,
	parser: "typescript",
	endOfLine: "auto",
	semi: false,
};
