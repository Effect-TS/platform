/**
 * @since 1.0.0
 */
import * as Context from "@effect/data/Context"
import type { Effect } from "@effect/io/Effect"

/**
 * @since 1.0.0
 * @category model
 */
export interface Console {
  assert(condition: boolean, ...args: Array<any>): Effect<never, never, void>
  clear(): Effect<never, never, void>
  count(label?: string): Effect<never, never, void>
  countReset(label?: string): Effect<never, never, void>
  debug(...args: Array<any>): Effect<never, never, void>
  dir(...args: Array<any>): Effect<never, never, void>
  dirxml(...args: Array<any>): Effect<never, never, void>
  error(...args: Array<any>): Effect<never, never, void>
  group(options?: {
    readonly label?: string
    readonly collapsed?: boolean
  }): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  info(...args: Array<any>): Effect<never, never, void>
  log(...args: Array<any>): Effect<never, never, void>
  table(tabularData: any, properties?: ReadonlyArray<string>): Effect<never, never, void>
  time(label?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  timeLog(label?: string, ...args: Array<any>): Effect<never, never, void>
  trace(...args: Array<any>): Effect<never, never, void>
  warn(...args: Array<any>): Effect<never, never, void>
}

/**
 * @since 1.0.0
 * @category tag
 */
export const Console: Context.Tag<Console, Console> = Context.Tag<Console>()
