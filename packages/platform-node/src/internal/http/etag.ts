import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import * as Etag from "@effect/platform/Http/Etag"

const zeroHash = (0).toString(16)

/** @internal */
export const layer = Layer.succeed(
  Etag.EtagGenerator,
  Etag.EtagGenerator.of({
    [Etag.TypeId]: Etag.TypeId,
    fromFileInfo(info) {
      return Effect.sync(() => {
        const hash = info.mtime._tag === "Some"
          ? info.mtime.value.getTime().toString(16)
          : zeroHash
        return info.size.toString(16) + "-" + hash.slice(0, 27)
      })
    }
  })
)
