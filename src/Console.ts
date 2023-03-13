/**
 * @since 1.0.0
 */
import * as Context from "@effect/data/Context"

/**
 * @since 1.0.0
 * @category models
 */
export interface Console {
  printLine(message: any): void
}

/**
 * @since 1.0.0
 * @category context
 */
export const Console: Context.Tag<Console> = Context.Tag<Console>()
