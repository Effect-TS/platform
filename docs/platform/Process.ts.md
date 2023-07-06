---
title: Process.ts
nav_order: 7
parent: "@effect/platform"
---

## Process overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ExitCode](#exitcode)
  - [Id](#id)
  - [makeExecutor](#makeexecutor)
- [models](#models)
  - [ExitCode (type alias)](#exitcode-type-alias)
  - [Process (interface)](#process-interface)
  - [ProcessExecutor (interface)](#processexecutor-interface)
  - [ProcessId (type alias)](#processid-type-alias)
  - [Signal (type alias)](#signal-type-alias)
- [symbols](#symbols)
  - [ProcessTypeId](#processtypeid)
  - [ProcessTypeId (type alias)](#processtypeid-type-alias)
- [tags](#tags)
  - [ProcessExecutor](#processexecutor)

---

# constructors

## ExitCode

**Signature**

```ts
export declare const ExitCode: Brand.Brand.Constructor<ExitCode>
```

Added in v1.0.0

## Id

**Signature**

```ts
export declare const Id: Brand.Brand.Constructor<ProcessId>
```

Added in v1.0.0

## makeExecutor

**Signature**

```ts
export declare const makeExecutor: (
  start: (command: Command) => Effect<never, PlatformError, Process>
) => ProcessExecutor
```

Added in v1.0.0

# models

## ExitCode (type alias)

**Signature**

```ts
export type ExitCode = Brand.Branded<number, 'ExitCode'>
```

Added in v1.0.0

## Process (interface)

**Signature**

```ts
export interface Process {
  readonly [ProcessTypeId]: ProcessTypeId
  readonly pid: Process.Id
  // readonly exitCode: Effect<never, PlatformError, ExitCode>
  // readonly isAlive: Effect<never, PlatformError, boolean>
  // /** Defaults to SIGTERM */
  // readonly kill: (signal?: Signal) => Effect<never, PlatformError, void>
  readonly stderr: Stream<never, PlatformError, Uint8Array>
  readonly stdin: Sink<never, PlatformError, Uint8Array, never, void>
  readonly stdout: Stream<never, PlatformError, Uint8Array>
}
```

Added in v1.0.0

## ProcessExecutor (interface)

**Signature**

```ts
export interface ProcessExecutor {
  readonly start: (command: Command) => Effect<never, PlatformError, Process>
}
```

Added in v1.0.0

## ProcessId (type alias)

**Signature**

```ts
export type ProcessId = Brand.Branded<number, 'ProcessId'>
```

Added in v1.0.0

## Signal (type alias)

**Signature**

```ts
export type Signal =
  | 'SIGABRT'
  | 'SIGALRM'
  | 'SIGBUS'
  | 'SIGCHLD'
  | 'SIGCONT'
  | 'SIGFPE'
  | 'SIGHUP'
  | 'SIGILL'
  | 'SIGINT'
  | 'SIGIO'
  | 'SIGIOT'
  | 'SIGKILL'
  | 'SIGPIPE'
  | 'SIGPOLL'
  | 'SIGPROF'
  | 'SIGPWR'
  | 'SIGQUIT'
  | 'SIGSEGV'
  | 'SIGSTKFLT'
  | 'SIGSTOP'
  | 'SIGSYS'
  | 'SIGTERM'
  | 'SIGTRAP'
  | 'SIGTSTP'
  | 'SIGTTIN'
  | 'SIGTTOU'
  | 'SIGUNUSED'
  | 'SIGURG'
  | 'SIGUSR1'
  | 'SIGUSR2'
  | 'SIGVTALRM'
  | 'SIGWINCH'
  | 'SIGXCPU'
  | 'SIGXFSZ'
  | 'SIGBREAK'
  | 'SIGLOST'
  | 'SIGINFO'
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

## ProcessExecutor

**Signature**

```ts
export declare const ProcessExecutor: Tag<ProcessExecutor, ProcessExecutor>
```

Added in v1.0.0
