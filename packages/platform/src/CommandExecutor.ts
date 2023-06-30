/**
 * @since 1.0.0
 */
import type * as Brand from "@effect/data/Brand"
import type { Tag } from "@effect/data/Context"
import type { Effect } from "@effect/io/Effect"
import type { Command } from "@effect/platform/Command"
import type { PlatformError } from "@effect/platform/Error"
import * as internal from "@effect/platform/internal/commandExecutor"
import type { Sink } from "@effect/stream/Sink"
import type { Stream } from "@effect/stream/Stream"

/**
 * @since 1.0.0
 * @category models
 */
export interface CommandExecutor {
  /**
   * Start running the command and return a handle to the running process.
   */
  readonly start: (command: Command) => Effect<never, PlatformError, Process>
  /**
   * Runs the command returning the entire output as a string with the
   * specified encoding.
   *
   * If an encoding is not specified, the encoding will default to `utf-8`.
   */
  readonly string: (command: Command, encoding?: string) => Effect<never, PlatformError, string>
  /**
   * Start running the command and return the output as a `Stream`.
   */
  readonly stream: (command: Command) => Stream<never, PlatformError, Uint8Array>
}

/**
 * @since 1.0.0
 * @category tags
 */
export const ProcessExecutor: Tag<CommandExecutor, CommandExecutor> = internal.ProcessExecutor

/**
 * @since 1.0.0
 * @category symbols
 */
export const ProcessTypeId: unique symbol = internal.ProcessTypeId

/**
 * @since 1.0.0
 * @category symbols
 */
export type ProcessTypeId = typeof ProcessTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface Process {
  readonly [ProcessTypeId]: ProcessTypeId
  /**
   * The process identifier.
   */
  readonly pid: ProcessId
  /**
   * Waits for the process to exit and returns the `ExitCode` of the command
   * that was run.
   */
  readonly exitCode: Effect<never, PlatformError, ExitCode>
  /**
   * Returns `true` if the process is still running, otherwise returns `false`.
   */
  readonly isRunning: Effect<never, PlatformError, boolean>
  /**
   * Kills the running process with the provided signal.
   *
   * If no signal is provided, the signal will defaults to `SIGTERM`.
   */
  readonly kill: (signal?: Signal) => Effect<never, PlatformError, void>
  /**
   * The standard error stream of the process.
   */
  readonly stderr: Stream<never, PlatformError, Uint8Array>
  /**
   * The standard input sink of the process.
   */
  readonly stdin: Sink<never, PlatformError, Uint8Array, never, void>
  /**
   * The standard output stream of the process.
   */
  readonly stdout: Stream<never, PlatformError, Uint8Array>
}

/**
 * @since 1.0.0
 * @category models
 */
export type ProcessId = Brand.Branded<number, "ProcessId">

/**
 * @since 1.0.0
 */
export namespace Process {
  /**
   * @since 1.0.0
   * @category models
   */
  export type Id = ProcessId
}

/**
 * @since 1.0.0
 * @category models
 */
export type Signal =
  | "SIGABRT"
  | "SIGALRM"
  | "SIGBUS"
  | "SIGCHLD"
  | "SIGCONT"
  | "SIGFPE"
  | "SIGHUP"
  | "SIGILL"
  | "SIGINT"
  | "SIGIO"
  | "SIGIOT"
  | "SIGKILL"
  | "SIGPIPE"
  | "SIGPOLL"
  | "SIGPROF"
  | "SIGPWR"
  | "SIGQUIT"
  | "SIGSEGV"
  | "SIGSTKFLT"
  | "SIGSTOP"
  | "SIGSYS"
  | "SIGTERM"
  | "SIGTRAP"
  | "SIGTSTP"
  | "SIGTTIN"
  | "SIGTTOU"
  | "SIGUNUSED"
  | "SIGURG"
  | "SIGUSR1"
  | "SIGUSR2"
  | "SIGVTALRM"
  | "SIGWINCH"
  | "SIGXCPU"
  | "SIGXFSZ"
  | "SIGBREAK"
  | "SIGLOST"
  | "SIGINFO"

/**
 * @since 1.0.0
 * @category models
 */
export type ExitCode = Brand.Branded<number, "ExitCode">

/**
 * @since 1.0.0
 * @category constructors
 */
export const ExitCode: Brand.Brand.Constructor<ExitCode> = internal.ExitCode

/**
 * @since 1.0.0
 * @category constructors
 */
export const ProcessId: Brand.Brand.Constructor<Process.Id> = internal.ProcessId

/**
 * @since 1.0.0
 * @category constructors
 */
export const makeExecutor: (
  start: (command: Command) => Effect<never, PlatformError, Process>
) => CommandExecutor = internal.makeExecutor
