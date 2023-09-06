import type { Tag } from "@effect/data/Context"
import type * as Effect from "@effect/io/Effect"
import type { PlatformError } from "@effect/platform/Error"
import * as internal from "@effect/platform/internal/clipboard"

export interface Clipboard {
  read: Effect.Effect<never, PlatformError, ClipboardItems>
  readString: Effect.Effect<never, PlatformError, string>
  write: (text: ClipboardItems) => Effect.Effect<never, PlatformError, void>
  writeString: (text: string) => Effect.Effect<never, PlatformError, void>
  clear: Effect.Effect<never, PlatformError, void>
}

/**
 * @since 1.0.0
 * @category constructor
 */
export const make: (
  impl: Omit<Clipboard, "clear">
) => Clipboard = internal.make

/**
 * @since 1.0.0
 * @category tag
 */
export const Clipboard: Tag<Clipboard, Clipboard> = internal.tag
