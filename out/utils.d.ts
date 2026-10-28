/**
 * Based on Bot API 10.3; generated from Swagger/OpenAPI JSON. Do not edit.
 */

import type { APIMethods } from "./methods"

export type CallAPI<T, R> = (params: T) => Promise<R>

export type CallAPIWithoutParams<R> = () => Promise<R>

export type CallAPIWithOptionalParams<T, R> = (params?: T) => Promise<R>

export type APIMethodParams<APIMethod extends keyof APIMethods> = Parameters<
    APIMethods[APIMethod]
>[0]

export type APIMethodReturn<APIMethod extends keyof APIMethods> = Awaited<
    ReturnType<APIMethods[APIMethod]>
>
