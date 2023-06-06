/**
 * @since 1.0.0
 */
import type { Layer } from "@effect/io/Layer"
import * as internal from "@effect/platform-node/internal/console"
import type { Console } from "@effect/platform/Console"

export type {
  /**
   * @since 1.0.0
   * @category model
   */
  Console
} from "@effect/platform/Console"

export {
  /**
   * @since 1.0.0
   * @category tag
   */
  tag
} from "@effect/platform/Console"

/**
 * @since 1.0.0
 * @category layer
 */
export const layer: Layer<never, never, Console> = internal.layer
