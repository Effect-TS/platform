/**
 * @since 1.0.0
 */
import * as Context from "@effect/data/Context"

/**
 * @since 1.0.0
 * @category model
 */
export interface Console {
  log(...args: Array<any>): void
  logError(...args: Array<any>): void
}

/**
 * @since 1.0.0
 * @category context
 */
export const tag: Context.Tag<Console, Console> = Context.Tag<Console>()
