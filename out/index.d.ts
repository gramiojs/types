/**
 * @module
 *
 * This module re-export another modules (+ export params as TelegramParams/objects as TelegramObjects)
 *
 * @example import
 * ```typescript
 * import { TelegramUser, SendMessageParams, APIMethods, APIMethodReturn } from "@gramio/types";
 * ```
 *
 * Based on Bot API v8.2.0 (01.01.2025)
 *
 * Generated at 07.01.2025, 12:35:45 using [types](https://github.com/gramiojs/types) and [schema](https://ark0f.github.io/tg-bot-api) generators
 */

export type * from "./methods"
export type * from "./params"
export type * as TelegramParams from "./params"
export type * from "./objects"
export type * as TelegramObjects from "./objects"
export type { APIMethodParams, APIMethodReturn } from "./utils"
