/**
 * @since 1.0.0
 */

export type {
  /**
   * @category models
   * @since 1.0.0
   */
  FromReadableOptions,
  /**
   * @category models
   * @since 1.0.0
   */
  FromWritableOptions
} from "@effect/platform-node/Stream"

export {
  /**
   * @category constructors
   * @since 1.0.0
   */
  fromDuplex,
  /**
   * @category constructors
   * @since 1.0.0
   */
  fromReadable,
  /**
   * @category combinators
   * @since 1.0.0
   */
  pipeThroughDuplex,
  /**
   * @since 1.0.0
   * @category conversions
   */
  toString,
  /**
   * @since 1.0.0
   * @category conversions
   */
  toUint8Array
} from "@effect/platform-node/Stream"
