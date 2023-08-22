import * as Context from "@effect/data/Context"
import type * as Etag from "@effect/platform/Http/Etag"

/** @internal */
export const TypeId: Etag.TypeId = Symbol.for("@effect/platform/Http/Etag") as Etag.TypeId

/** @internal */
export const tag = Context.Tag<Etag.EtagGenerator>(TypeId)
