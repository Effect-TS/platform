/**
 * @since 1.0.0
 */
import type { HashMap } from "@effect/data/HashMap"
import type { Option } from "@effect/data/Option"
import type { NonEmptyReadonlyArray } from "@effect/data/ReadonlyArray"
import type { PlatformError } from "@effect/platform/Error"
import * as internal from "@effect/platform/internal/process/command"
import type { Stream } from "@effect/stream/Stream"

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
 */
export declare namespace Command {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Proto {
    readonly [CommandTypeId]: CommandTypeId
  }
  /**
   * Configures the pipe that is established between the parent and child
   * processes' `stdin` stream.
   *
   * @since 1.0.0
   * @category models
   */
  export type Input = Stream<never, PlatformError, number>
  /**
   * Configures the pipes that are established between the parent and child
   * processes `stderr` and `stdout` streams.
   *
   * @since 1.0.0
   * @category models
   */
  export type Output = "inherit" | "pipe"
}

/**
 * @since 1.0.0
 * @category models
 */
export interface StandardCommand extends Command.Proto {
  readonly _tag: "StandardCommand"
  readonly command: string
  readonly args: ReadonlyArray<string>
  readonly env: HashMap<string, string>
  readonly cwd: Option<string>
  readonly stdin: Option<Command.Input>
  readonly stdout: Command.Output
  readonly stderr: Command.Output
  readonly gid: Option<number>
  readonly uid: Option<number>
}

/**
 * @since 1.0.0
 * @category models
 */
export interface PipedCommand extends Command.Proto {
  readonly _tag: "PipedCommand"
  readonly left: Command
  readonly right: Command
}

/**
 * Specify the environment variables that will be used when running this command.
 *
 * @since 1.0.0
 * @category combinators
 */
export const env: {
  (environment: HashMap<string, string>): (self: Command) => Command
  (self: Command, environment: HashMap<string, string>): Command
} = internal.env

/**
 * Flatten this command to a non-empty array of standard commands.
 *
 * * For a `StandardCommand`, this simply returns a `1` element array
 * * For a `PipedCommand`, all commands in the pipe will be extracted out into
 *   a array from left to right
 *
 * @since 1.0.0
 * @category combinators
 */
export const flatten: (self: Command) => NonEmptyReadonlyArray<StandardCommand> = internal.flatten

/**
 * Create a command with the specified process name and an optional list of
 * arguments.
 *
 * @since 1.0.0
 * @category constructors
 */
export const make: (command: string, ...args: Array<string>) => Command = internal.make

/**
 * Pipe one command to another command from left to right.
 *
 * Conceptually, the equivalent of piping one shell command to another:
 *
 * ```sh
 * command1 | command2
 * ```
 *
 * @since 1.0.0
 * @category combinators
 */
export const pipeTo: {
  (into: Command): (self: Command) => Command
  (self: Command, into: Command): Command
} = internal.pipeTo

/**
 * Specify the standard error stream for a command.
 *
 * @since 1.0.0
 * @category combinators
 */
export const stderr: {
  (stderr: Command.Output): (self: Command) => Command
  (self: Command, stderr: Command.Output): Command
} = internal.stderr

/**
 * Specify the standard input stream for a command.
 *
 * @since 1.0.0
 * @category combinators
 */
export const stdin: {
  (stdin: Command.Input): (self: Command) => Command
  (self: Command, stdin: Command.Input): Command
} = internal.stdin

/**
 * Specify the standard output stream for a command.
 *
 * @since 1.0.0
 * @category combinators
 */
export const stdout: {
  (stdout: Command.Output): (self: Command) => Command
  (self: Command, stdout: Command.Output): Command
} = internal.stdout

/**
 * Set the working directory that will be used when this command will be run.
 *
 * For piped commands, the working directory of each command will be set to the
 * specified working directory.
 *
 * @since 1.0.0
 * @category combinators
 */
export const workingDirectory: {
  (cwd: string): (self: Command) => Command
  (self: Command, cwd: string): Command
} = internal.workingDirectory
