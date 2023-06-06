import * as Data from "@effect/data/Data"
import type * as Error from "@effect/platform/Error"

/** @internal */
export const PlatformErrorTypeId: Error.PlatformErrorTypeId = Symbol.for(
  "@effect/platform/Error/PlatformErrorTypeId"
) as Error.PlatformErrorTypeId

const make = <A extends Error.PlatformError>(tag: A["_tag"]) =>
  (props: Omit<A, Error.PlatformErrorTypeId | keyof Data.Case | "_tag">): A =>
    Data.struct({
      [PlatformErrorTypeId]: PlatformErrorTypeId,
      _tag: tag,
      ...props
    } as A)

/** @internal */
export const badArgument = make<Error.BadArgument>("BadArgument")

/** @internal */
export const permissionDenied = make<Error.PermissionDenied>("PermissionDenied")

/** @internal */
export const systemError = make<Error.SystemError>("SystemError")
