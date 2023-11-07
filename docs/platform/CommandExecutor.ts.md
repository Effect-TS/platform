---
title: CommandExecutor.ts
nav_order: 2
parent: "@effect/platform"
---

## CommandExecutor overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ExitCode](#exitcode)
  - [ProcessId](#processid)
  - [makeExecutor](#makeexecutor)
- [models](#models)
  - [CommandExecutor (interface)](#commandexecutor-interface)
  - [ExitCode (type alias)](#exitcode-type-alias)
  - [Process (interface)](#process-interface)
  - [ProcessId (type alias)](#processid-type-alias)
  - [Signal (type alias)](#signal-type-alias)
- [symbols](#symbols)
  - [ProcessTypeId](#processtypeid)
  - [ProcessTypeId (type alias)](#processtypeid-type-alias)
- [tags](#tags)
  - [CommandExecutor](#commandexecutor)
- [utils](#utils)
  - [Process (namespace)](#process-namespace)
    - [Id (type alias)](#id-type-alias)

---

# constructors

## ExitCode

**Signature**

```ts
export declare const ExitCode: Brand.Brand.Constructor<ExitCode>
```

Added in v1.0.0

## ProcessId

**Signature**

```ts
export declare const ProcessId: Brand.Brand.Constructor<ProcessId>
```

Added in v1.0.0

## makeExecutor

**Signature**

```ts
export declare const makeExecutor: (
  start: (command: Command) => Effect<never, PlatformError, Process>
) => CommandExecutor
```

Added in v1.0.0

# models

## CommandExecutor (interface)

**Signature**

```ts
export interface CommandExecutor {
  /**
   * Returns the exit code of the command after the process has completed
   * execution.
   */
  readonly exitCode: (command: Command) => Effect<never, PlatformError, ExitCode>
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
   * Runs the command returning the entire output as an array of lines.
   *
   * If an encoding is not specified, the encoding will default to `utf-8`.
   */
  readonly lines: (command: Command, encoding?: string) => Effect<never, PlatformError, ReadonlyArray<string>>
  /**
   * Runs the command returning the output as a `Stream`.
   */
  readonly stream: (command: Command) => Stream<never, PlatformError, Uint8Array>
  /**
   * Runs the command returning the output as a `Stream` of lines.
   */
  readonly streamLines: (command: Command, encoding?: string) => Stream<never, PlatformError, string>
}
```

Added in v1.0.0

## ExitCode (type alias)

**Signature**

```ts
export type ExitCode = Brand.Branded<number, "ExitCode">
```

Added in v1.0.0

## Process (interface)

**Signature**

```ts
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
```

Added in v1.0.0

## ProcessId (type alias)

**Signature**

```ts
export type ProcessId = Brand.Branded<number, "ProcessId">
```

Added in v1.0.0

## Signal (type alias)

**Signature**

```ts
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
```

Added in v1.0.0

# symbols

## ProcessTypeId

**Signature**

```ts
export declare const ProcessTypeId: typeof ProcessTypeId
```

Added in v1.0.0

## ProcessTypeId (type alias)

**Signature**

```ts
export type ProcessTypeId = typeof ProcessTypeId
```

Added in v1.0.0

# tags

## CommandExecutor

**Signature**

```ts
export declare const CommandExecutor: Tag<CommandExecutor, CommandExecutor>
```

Added in v1.0.0

# utils

## Process (namespace)

Added in v1.0.0

### Id (type alias)

**Signature**

```ts
export type Id = ProcessId
```

Added in v1.0.0
