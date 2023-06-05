import * as Data from "@effect/data/Data"
import type * as Error from "@effect/platform/Error"

/** @internal */
export const PlatformErrorTypeId: Error.PlatformErrorTypeId = Symbol.for(
  "@effect/platform/Error/PlatformErrorTypeId"
) as Error.PlatformErrorTypeId

const make = <A extends Error.PlatformError>(tag: A["_tag"]) =>
  (props: Omit<A, keyof Error.PlatformError>): A =>
    Data.struct({
      [PlatformErrorTypeId]: PlatformErrorTypeId,
      _tag: tag,
      ...props
    } as A)

/** @internal */
export const alreadyExists = make<Error.AlreadyExists>("AlreadyExists")

/** @internal */
export const badArgument = make<Error.BadArgument>("BadArgument")

/** @internal */
export const badResource = make<Error.BadResource>("BadResource")

/** @internal */
export const busy = make<Error.Busy>("Busy")

/** @internal */
export const invalidData = make<Error.InvalidData>("InvalidData")

/** @internal */
export const notFound = make<Error.NotFound>("NotFound")

/** @internal */
export const noSupported = make<Error.NotSupported>("NotSupported")

/** @internal */
export const permissionDenied = make<Error.PermissionDenied>("PermissionDenied")

/** @internal */
export const timedOut = make<Error.TimedOut>("TimedOut")

/** @internal */
export const unexpectedEof = make<Error.UnexpectedEof>("UnexpectedEof")

/** @internal */
export const writeZero = make<Error.WriteZero>("WriteZero")
