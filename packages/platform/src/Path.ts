/**
 * @since 1.0.0
 */

import type { Effect } from "@effect/io/Effect"
import type { BadArgument } from "@effect/platform/Error"

/**
 * @since 1.0.0
 * @category model
 */
export interface Path {
  readonly sep: string
  readonly basename: (path: string, suffix?: string) => string
  readonly dirname: (path: string) => string
  readonly extname: (path: string) => string
  readonly format: (pathObject: Partial<Path.Parsed>) => string
  readonly fromFileUrl: (url: URL) => Effect<never, BadArgument, string>
  readonly isAbsolute: (path: string) => boolean
  readonly join: (...paths: ReadonlyArray<string>) => string
  readonly normalize: (path: string) => string
  readonly parse: (path: string) => Path.Parsed
  readonly relative: (from: string, to: string) => string
  readonly resolve: (...pathSegments: ReadonlyArray<string>) => string
  readonly toFileUrl: (path: string) => URL
  readonly toNamespacedPath: (path: string) => string
}

/**
 * @since 1.0.0
 */
export namespace Path {
  /**
   * @since 1.0.0
   * @category model
   */
  export interface Parsed {
    readonly root: string
    readonly dir: string
    readonly base: string
    readonly ext: string
    readonly name: string
  }
}
