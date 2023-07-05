---
title: Command.ts
nav_order: 1
parent: "@effect/platform-node"
---

## Command overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [env](#env)
  - [feed](#feed)
  - [flatten](#flatten)
  - [pipeTo](#pipeto)
  - [stderr](#stderr)
  - [stdin](#stdin)
  - [stdout](#stdout)
  - [workingDirectory](#workingdirectory)
- [constructors](#constructors)
  - [make](#make)
- [execution](#execution)
  - [exitCode](#exitcode)
  - [lines](#lines)
  - [start](#start)
  - [stream](#stream)
  - [streamLines](#streamlines)
  - [string](#string)
- [model](#model)
  - [Command](#command)
  - [CommandInput](#commandinput)
  - [CommandOutput](#commandoutput)
  - [PipedCommand](#pipedcommand)
  - [StandardCommand](#standardcommand)
- [refinements](#refinements)
  - [isCommand](#iscommand)

---

# combinators

## env

**Signature**

```ts
export declare const env: {
  (environment: Record<string, string>): (self: Command) => Command
  (self: Command, environment: Record<string, string>): Command
}
```

Added in v1.0.0

## feed

**Signature**

```ts
export declare const feed: { (input: string): (self: Command) => Command; (self: Command, input: string): Command }
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: (self: Command) => readonly [StandardCommand, ...StandardCommand[]]
```

Added in v1.0.0

## pipeTo

**Signature**

```ts
export declare const pipeTo: { (into: Command): (self: Command) => Command; (self: Command, into: Command): Command }
```

Added in v1.0.0

## stderr

**Signature**

```ts
export declare const stderr: {
  (stderr: CommandOutput): (self: Command) => Command
  (self: Command, stderr: CommandOutput): Command
}
```

Added in v1.0.0

## stdin

**Signature**

```ts
export declare const stdin: {
  (stdin: CommandInput): (self: Command) => Command
  (self: Command, stdin: CommandInput): Command
}
```

Added in v1.0.0

## stdout

**Signature**

```ts
export declare const stdout: {
  (stdout: CommandOutput): (self: Command) => Command
  (self: Command, stdout: CommandOutput): Command
}
```

Added in v1.0.0

## workingDirectory

**Signature**

```ts
export declare const workingDirectory: {
  (cwd: string): (self: Command) => Command
  (self: Command, cwd: string): Command
}
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: (command: string, ...args: string[]) => Command
```

Added in v1.0.0

# execution

## exitCode

**Signature**

```ts
export declare const exitCode: (self: Command) => Effect<CommandExecutor, PlatformError, ExitCode>
```

Added in v1.0.0

## lines

**Signature**

```ts
export declare const lines: (
  command: Command,
  encoding?: string | undefined
) => Effect<CommandExecutor, PlatformError, readonly string[]>
```

Added in v1.0.0

## start

**Signature**

```ts
export declare const start: (command: Command) => Effect<CommandExecutor, PlatformError, Process>
```

Added in v1.0.0

## stream

**Signature**

```ts
export declare const stream: (command: Command) => Stream<CommandExecutor, PlatformError, Uint8Array>
```

Added in v1.0.0

## streamLines

**Signature**

```ts
export declare const streamLines: (command: Command) => Stream<CommandExecutor, PlatformError, string>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: {
  (encoding?: string | undefined): (command: Command) => Effect<CommandExecutor, PlatformError, string>
  (command: Command, encoding?: string | undefined): Effect<CommandExecutor, PlatformError, string>
}
```

Added in v1.0.0

# model

## Command

**Signature**

```ts
export declare const Command: Command
```

Added in v1.0.0

## CommandInput

**Signature**

```ts
export declare const CommandInput: CommandInput
```

Added in v1.0.0

## CommandOutput

**Signature**

```ts
export declare const CommandOutput: CommandOutput
```

Added in v1.0.0

## PipedCommand

**Signature**

```ts
export declare const PipedCommand: PipedCommand
```

Added in v1.0.0

## StandardCommand

**Signature**

```ts
export declare const StandardCommand: StandardCommand
```

Added in v1.0.0

# refinements

## isCommand

**Signature**

```ts
export declare const isCommand: (u: unknown) => u is Command
```

Added in v1.0.0
