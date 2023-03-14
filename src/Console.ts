/**
 * @since 1.0.0
 */
import * as Context from "@effect/data/Context"
import * as Effect from "@effect/io/Effect"

/**
 * @since 1.0.0
 * @category models
 */
export interface Console {
  log(message: any): void
}

/**
 * @since 1.0.0
 * @category context
 */
export const Console: Context.Tag<Console> = Context.Tag<Console>()

/**
 * @since 1.0.0
 * @category accessors
 */
export const log = (message: any): Effect.Effect<Console, never, void> =>
  Effect.serviceWith(Console, (console) => console.log(message))
