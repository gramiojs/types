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
 * Based on Bot API v10.0 (08.05.2026)
 *
 * Generated at 08.05.2026, 14:21:34 using [types](https://github.com/gramiojs/types) and [schema](https://github.com/gramiojs/schema-parser) generators
 */

export type * from "./methods"
export type * from "./params"
export type * as TelegramParams from "./params"
export type * from "./objects"
export type * as TelegramObjects from "./objects"
export type { APIMethodParams, APIMethodReturn } from "./utils"
