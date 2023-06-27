---
title: Command.ts
nav_order: 1
parent: "@effect/platform"
---

## Command overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [env](#env)
  - [flatten](#flatten)
  - [pipeTo](#pipeto)
  - [stderr](#stderr)
  - [stdin](#stdin)
  - [stdout](#stdout)
  - [workingDirectory](#workingdirectory)
- [constructors](#constructors)
  - [make](#make)
- [execution](#execution)
  - [run](#run)
- [models](#models)
  - [Command (type alias)](#command-type-alias)
  - [CommandInput (type alias)](#commandinput-type-alias)
  - [CommandOutput (type alias)](#commandoutput-type-alias)
  - [PipedCommand (interface)](#pipedcommand-interface)
  - [StandardCommand (interface)](#standardcommand-interface)
- [utils](#utils)
  - [CommandTypeId](#commandtypeid)
  - [CommandTypeId (type alias)](#commandtypeid-type-alias)

---

# combinators

## env

Specify the environment variables that will be used when running this command.

**Signature**

```ts
export declare const env: {
  (environment: HashMap<string, string>): (self: Command) => Command
  (self: Command, environment: HashMap<string, string>): Command
}
```

Added in v1.0.0

## flatten

Flatten this command to a non-empty array of standard commands.

- For a `StandardCommand`, this simply returns a `1` element array
- For a `PipedCommand`, all commands in the pipe will be extracted out into
  a array from left to right

**Signature**

```ts
export declare const flatten: (self: Command) => readonly [StandardCommand, ...StandardCommand[]]
```

Added in v1.0.0

## pipeTo

Pipe one command to another command from left to right.

Conceptually, the equivalent of piping one shell command to another:

```sh
command1 | command2
```

**Signature**

```ts
export declare const pipeTo: { (into: Command): (self: Command) => Command; (self: Command, into: Command): Command }
```

Added in v1.0.0

## stderr

Specify the standard error stream for a command.

**Signature**

```ts
export declare const stderr: {
  (stderr: Command.Output): (self: Command) => Command
  (self: Command, stderr: Command.Output): Command
}
```

Added in v1.0.0

## stdin

Specify the standard input stream for a command.

**Signature**

```ts
export declare const stdin: {
  (stdin: CommandInput): (self: Command) => Command
  (self: Command, stdin: CommandInput): Command
}
```

Added in v1.0.0

## stdout

Specify the standard output stream for a command.

**Signature**

```ts
export declare const stdout: {
  (stdout: Command.Output): (self: Command) => Command
  (self: Command, stdout: Command.Output): Command
}
```

Added in v1.0.0

## workingDirectory

Set the working directory that will be used when this command will be run.

For piped commands, the working directory of each command will be set to the
specified working directory.

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

Create a command with the specified process name and an optional list of
arguments.

**Signature**

```ts
export declare const make: (command: string, ...args: Array<string>) => Command
```

Added in v1.0.0

# execution

## run

Start running the command and return a handle to the running process.

**Signature**

```ts
export declare const run: (command: Command) => Effect<ProcessExecutor, PlatformError, Process>
```

Added in v1.0.0

# models

## Command (type alias)

**Signature**

```ts
export type Command = StandardCommand | PipedCommand
```

Added in v1.0.0

## CommandInput (type alias)

Configures the pipe that is established between the parent and child
processes' `stdin` stream.

**Signature**

```ts
export type CommandInput = Stream<never, PlatformError, Uint8Array>
```

Added in v1.0.0

## CommandOutput (type alias)

Configures the pipes that are established between the parent and child
processes `stderr` and `stdout` streams.

**Signature**

```ts
export type CommandOutput = 'inherit' | 'pipe'
```

Added in v1.0.0

## PipedCommand (interface)

**Signature**

```ts
export interface PipedCommand extends Command.Proto {
  readonly _tag: 'PipedCommand'
  readonly left: Command
  readonly right: Command
}
```

Added in v1.0.0

## StandardCommand (interface)

**Signature**

```ts
export interface StandardCommand extends Command.Proto {
  readonly _tag: 'StandardCommand'
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
```

Added in v1.0.0

# utils

## CommandTypeId

**Signature**

```ts
export declare const CommandTypeId: typeof CommandTypeId
```

Added in v1.0.0

## CommandTypeId (type alias)

**Signature**

```ts
export type CommandTypeId = typeof CommandTypeId
```

Added in v1.0.0
