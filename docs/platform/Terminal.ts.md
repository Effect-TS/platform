---
title: Terminal.ts
nav_order: 31
parent: "@effect/platform"
---

## Terminal overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Key (interface)](#key-interface)
  - [QuitException (class)](#quitexception-class)
  - [UserInput (interface)](#userinput-interface)
- [models](#models)
  - [Terminal (interface)](#terminal-interface)
- [tag](#tag)
  - [Terminal](#terminal)

---

# model

## Key (interface)

**Signature**

```ts
export interface Key {
  /**
   * The name of the key being pressed.
   */
  readonly name: string
  /**
   * If set to `true`, then the user is also holding down the `Ctrl` key.
   */
  readonly ctrl: boolean
  /**
   * If set to `true`, then the user is also holding down the `Meta` key.
   */
  readonly meta: boolean
  /**
   * If set to `true`, then the user is also holding down the `Shift` key.
   */
  readonly shift: boolean
}
```

Added in v1.0.0

## QuitException (class)

A `QuitException` represents an exception that occurs when a user attempts to
quit out of a `Terminal` prompt for input (usually by entering `ctrl`+`c`).

**Signature**

```ts
export declare class QuitException
```

Added in v1.0.0

## UserInput (interface)

**Signature**

```ts
export interface UserInput {
  /**
   * The character read from the user (if any).
   */
  readonly input: Option<string>
  /**
   * The key that the user pressed.
   */
  readonly key: Key
}
```

Added in v1.0.0

# models

## Terminal (interface)

A `Terminal` represents a command-line interface which can read input from a
user and display messages to a user.

**Signature**

```ts
export interface Terminal {
  /**
   * The number of columns available on the platform's terminal interface.
   */
  readonly columns: Effect<never, never, number>
  /**
   * Reads a single input event from the default standard input.
   */
  readonly readInput: Effect<never, QuitException, UserInput>
  /**
   * Reads a single line from the default standard input.
   */
  readonly readLine: Effect<never, QuitException, string>
  /**
   * Displays text to the the default standard output.
   */
  readonly display: (text: string) => Effect<never, PlatformError, void>
}
```

Added in v1.0.0

# tag

## Terminal

**Signature**

```ts
export declare const Terminal: Tag<Terminal, Terminal>
```

Added in v1.0.0
