import type * as Effect from "@effect/io/Effect";
import type { PlatformError } from "@effect/platform/Error"
import * as internal from "@effect/platform-browser/internal/clipboard";
import { Tag } from "@effect/data/Context"
import * as Layer from "@effect/io/Layer";

/**
 * @since 1.0.0
 * @category models
 */
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

/**
 * A layer that directly interfaces with the navigator.clipboard api 
 * 
 * @since 1.0.0
 * @category layers
 */
export const layerLive: Layer.Layer<never, never, Clipboard> = internal.layerLive;
