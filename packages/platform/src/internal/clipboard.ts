import { Tag } from "@effect/data/Context"
import type { Clipboard } from "@effect/platform/Clipboard"

export const tag = Tag<Clipboard>("@effect/platform/FileSystem")

export const make = (
  impl: Omit<Clipboard, "clear">
): Clipboard =>
  tag.of({
    ...impl,
    clear: impl.write("")
  })
