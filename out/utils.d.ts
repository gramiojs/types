/**
 * @module
 *
 * This module contains type-utils for convenient work
 *
 * @example import utils
 * ```typescript
 * import { APIMethodParams, APIMethodReturn } from "@gramio/types/utils";
 *
 * type SendMessageReturn = APIMethodReturn<"sendMessage">;
 * //   ^? type SendMessageReturn = TelegramMessage"
 * type SendMessageParams = APIMethodParams<"sendMessage">;
 * //   ^? type SendMessageParams = SendMessageParams"
 * ```
 *
 * Based on Bot API v9.1.0 (03.07.2025)
 *
 * Generated at 03.07.2025, 17:20:49 using [types](https://github.com/gramiojs/types) and [schema](https://ark0f.github.io/tg-bot-api) generators
 */

import type { APIMethods } from "./methods"

export type CallAPI<T, R> = (params: T) => Promise<R>
export type CallAPIWithoutParams<R> = () => Promise<R>
export type CallAPIWithOptionalParams<T, R> = (params?: T) => Promise<R>

/**
 * @example
 * ```typescript
 * type SendMessageParams = APIMethodParams<"sendMessage">;
 * //   ^? type SendMessageParams = SendMessageParams"
 * ```
 */
export type APIMethodParams<APIMethod extends keyof APIMethods> = Parameters<
    APIMethods[APIMethod]
>[0]
/**
 * @example
 * ```typescript
 * type SendMessageReturn = APIMethodReturn<"sendMessage">;
 * //   ^? type SendMessageReturn = TelegramMessage"
 * ```
 */
export type APIMethodReturn<APIMethod extends keyof APIMethods> = Awaited<
    ReturnType<APIMethods[APIMethod]>
>
