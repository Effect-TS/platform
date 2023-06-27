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
- [model](#model)
  - [Command](#command)
  - [CommandInput](#commandinput)
  - [CommandOutput](#commandoutput)
  - [PipedCommand](#pipedcommand)
  - [StandardCommand](#standardcommand)

---

# combinators

## env

**Signature**

```ts
export declare const env: {
  (environment: HashMap<string, string>): (self: Command) => Command
  (self: Command, environment: HashMap<string, string>): Command
}
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

## run

**Signature**

```ts
export declare const run: (command: Command) => Effect<ProcessExecutor, PlatformError, Process>
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
