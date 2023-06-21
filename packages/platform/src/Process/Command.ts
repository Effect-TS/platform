/**
 * @since 1.0.0
 */
import type { HashMap } from "@effect/data/HashMap"
import type { Option } from "@effect/data/Option"
import * as internal from "@effect/platform/internal/process/command"

/**
 * @since 1.0.0
 */
export const CommandTypeId: unique symbol = internal.CommandTypeId

/**
 * @since 1.0.0
 */
export type CommandTypeId = typeof CommandTypeId

/**
 * @since 1.0.0
 * @category models
 */
export type Command = StandardCommand | PipedCommand

/**
 * @since 1.0.0
 * @category models
 */
export interface StandardCommand {
  readonly [CommandTypeId]: (_: never) => unknown
  readonly _tag: "StandardCommand"
  readonly command: string
  readonly args: ReadonlyArray<string>
  readonly env: HashMap<string, string>
  readonly workingDirectory: Option<string>
}

/**
 * @since 1.0.0
 * @category models
 */
export interface PipedCommand {
  readonly [CommandTypeId]: (_: never) => unknown
  readonly _tag: "PipedCommand"
  readonly left: Command
  readonly right: Command
}
