import * as Effect from "@effect/io/Effect"
import type * as Body from "@effect/platform/Http/Body"
import * as Error from "@effect/platform/Http/Error"
import type * as Stream_ from "@effect/stream/Stream"

/** @internal */
export const TypeId: Body.TypeId = Symbol.for(
  "@effect/platform/Http/Body"
) as Body.TypeId

class EmptyImpl implements Body.Empty {
  readonly [TypeId]: Body.TypeId = TypeId
  readonly _tag = "Empty"
}

/** @internal */
export const empty: Body.Empty = new EmptyImpl()

class RawImpl implements Body.Raw {
  readonly [TypeId]: Body.TypeId = TypeId
  readonly _tag = "Raw"
  constructor(
    readonly body: unknown
  ) {}
}

/** @internal */
export const raw = (body: unknown): Body.Raw => new RawImpl(body)

class BytesImpl implements Body.Bytes {
  readonly [TypeId]: Body.TypeId = TypeId
  readonly _tag = "Bytes"
  constructor(
    readonly body: Uint8Array
  ) {}
}

/** @internal */
export const bytes = (body: Uint8Array): Body.Bytes => new BytesImpl(body)

class BytesEffectImpl implements Body.BytesEffect {
  readonly [TypeId]: Body.TypeId = TypeId
  readonly _tag = "BytesEffect"
  constructor(
    readonly body: Effect.Effect<never, Error.TransportError, Uint8Array>
  ) {}
}

/** @internal */
export const bytesEffect = (body: Effect.Effect<never, Error.TransportError, Uint8Array>): Body.BytesEffect =>
  new BytesEffectImpl(body)

/** @internal */
export const json = (body: unknown): Body.BytesEffect =>
  bytesEffect(Effect.try({
    try: () => new TextEncoder().encode(JSON.stringify(body)),
    catch: (error) =>
      Error.TransportError({
        method: "Body.json",
        reason: "Encode",
        error
      })
  }))

class FormDataImpl implements Body.FormData {
  readonly [TypeId]: Body.TypeId = TypeId
  readonly _tag = "FormData"
  constructor(
    readonly formData: FormData
  ) {}
}

/** @internal */
export const formData = (body: FormData): Body.FormData => new FormDataImpl(body)

class StreamImpl implements Body.Stream {
  readonly [TypeId]: Body.TypeId = TypeId
  readonly _tag = "Stream"
  constructor(
    readonly stream: Stream_.Stream<never, Error.TransportError, Uint8Array>
  ) {}
}

/** @internal */
export const stream = (body: Stream_.Stream<never, Error.TransportError, Uint8Array>): Body.Stream =>
  new StreamImpl(body)
