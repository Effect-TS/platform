import * as Data from "@effect/data/Data"
import type * as Error from "@effect/platform/Http/Error"

/** @internal */
export const TypeId: Error.TypeId = Symbol.for(
  "@effect/platform/Http/Error"
) as Error.TypeId

const make = <A extends Error.HttpError>(tag: A["_tag"]) => (props: Omit<A, Error.HttpError.ProvidedFields>): A =>
  Data.struct({
    [TypeId]: TypeId,
    _tag: tag,
    ...props
  } as A)

/** @internal */
export const statusError = make<Error.StatusError>("StatusError")

/** @internal */
export const transportError = make<Error.TransportError>("TransportError")
