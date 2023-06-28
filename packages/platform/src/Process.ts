/**
 * @since 1.0.0
 */
import type * as Brand from "@effect/data/Brand"
import type { Tag } from "@effect/data/Context"
import type { Effect } from "@effect/io/Effect"
import type { Command } from "@effect/platform/Command"
import type { PlatformError } from "@effect/platform/Error"
import * as internal from "@effect/platform/internal/process"
import type { Sink } from "@effect/stream/Sink"
import type { Stream } from "@effect/stream/Stream"

/**
 * @since 1.0.0
 * @category models
 */
export interface ProcessExecutor {
  readonly start: (command: Command) => Effect<never, PlatformError, Process>
}

/**
 * @since 1.0.0
 * @category tags
 */
export const ProcessExecutor: Tag<ProcessExecutor, ProcessExecutor> = internal.ProcessExecutor

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
  readonly pid: ProcessId
  // readonly exitCode: Effect<never, PlatformError, ExitCode>
  // readonly isAlive: Effect<never, PlatformError, boolean>
  // /** Defaults to SIGTERM */
  // readonly kill: (signal?: Signal) => Effect<never, PlatformError, void>
  readonly stderr: Stream<never, PlatformError, Uint8Array>
  readonly stdin: Sink<never, PlatformError, Uint8Array, never, void>
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
) => ProcessExecutor = internal.makeExecutor
