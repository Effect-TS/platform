import { Tag } from "@effect/data/Context"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import type * as Clipboard from "@effect/platform-browser/Clipboard"
import * as PlatformError from "@effect/platform/Error"

/** @internal */
export const tag = Tag<Clipboard.Clipboard>("@effect/platform/FileSystem")

/** @internal */
export const make = (
  impl: Omit<Clipboard.Clipboard, "clear">
): Clipboard.Clipboard =>
  tag.of({
    ...impl,
    clear: impl.writeString("")
  })

/** @internal */
const clipboardError = (props: Omit<Parameters<typeof PlatformError.SystemError>[0], "reason" | "module">) =>
  PlatformError.SystemError({
    reason: "PermissionDenied",
    module: "Clipboard",
    ...props
  })

/** @internal */
export const layerLive = Layer.succeed(
  tag,
  make({
    read: Effect.tryPromise({
      try: navigator.clipboard.read,
      catch: () =>
        clipboardError({
          "message": "Unable to read clipboard",
          "method": "read",
          "pathOrDescriptor": "layerLive"
        })
    }),
    write: (s: Array<ClipboardItem>) =>
      Effect.tryPromise({
        try: () => navigator.clipboard.write(s),
        catch: () =>
          clipboardError({
            "message": "Unable to read clipboard",
            "method": "write",
            "pathOrDescriptor": "layerLive"
          })
      }),
    readString: Effect.tryPromise({
      try: navigator.clipboard.readText,
      catch: () =>
        clipboardError({
          "message": "Unable to read clipboard",
          "method": "readString",
          "pathOrDescriptor": "layerLive"
        })
    }),
    writeString: (text: string) =>
      Effect.tryPromise({
        try: () => navigator.clipboard.writeText(text),
        catch: () =>
          clipboardError({
            "message": "Unable to write to clipboard",
            "method": "writeString",
            "pathOrDescriptor": "layerLive"
          })
      })
  })
)
