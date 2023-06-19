---
title: Console.ts
nav_order: 1
parent: "@effect/platform"
---

## Console overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [accessor](#accessor)
  - [assert](#assert)
  - [clear](#clear)
  - [count](#count)
  - [countReset](#countreset)
  - [debug](#debug)
  - [dir](#dir)
  - [dirxml](#dirxml)
  - [error](#error)
  - [group](#group)
  - [info](#info)
  - [log](#log)
  - [table](#table)
  - [time](#time)
  - [timeLog](#timelog)
  - [trace](#trace)
  - [warn](#warn)
  - [withGroup](#withgroup)
  - [withTime](#withtime)
- [layer](#layer)
  - [layer](#layer-1)
- [model](#model)
  - [Console (interface)](#console-interface)
- [tag](#tag)
  - [Console](#console)

---

# accessor

## assert

**Signature**

```ts
export declare const assert: (condition: boolean, ...args: ReadonlyArray<any>) => Effect<Console, never, void>
```

Added in v1.0.0

## clear

**Signature**

```ts
export declare const clear: () => Effect<Console, never, void>
```

Added in v1.0.0

## count

**Signature**

```ts
export declare const count: (label?: string) => Effect<Console, never, void>
```

Added in v1.0.0

## countReset

**Signature**

```ts
export declare const countReset: (label?: string) => Effect<Console, never, void>
```

Added in v1.0.0

## debug

**Signature**

```ts
export declare const debug: (...args: ReadonlyArray<any>) => Effect<Console, never, void>
```

Added in v1.0.0

## dir

**Signature**

```ts
export declare const dir: (...args: ReadonlyArray<any>) => Effect<Console, never, void>
```

Added in v1.0.0

## dirxml

**Signature**

```ts
export declare const dirxml: (...args: ReadonlyArray<any>) => Effect<Console, never, void>
```

Added in v1.0.0

## error

**Signature**

```ts
export declare const error: (...args: ReadonlyArray<any>) => Effect<Console, never, void>
```

Added in v1.0.0

## group

**Signature**

```ts
export declare const group: (options?: { label?: string; collapsed?: boolean }) => Effect<Console | Scope, never, void>
```

Added in v1.0.0

## info

**Signature**

```ts
export declare const info: (...args: ReadonlyArray<any>) => Effect<Console, never, void>
```

Added in v1.0.0

## log

**Signature**

```ts
export declare const log: (...args: ReadonlyArray<any>) => Effect<Console, never, void>
```

Added in v1.0.0

## table

**Signature**

```ts
export declare const table: (tabularData: any, properties?: ReadonlyArray<string>) => Effect<Console, never, void>
```

Added in v1.0.0

## time

**Signature**

```ts
export declare const time: (label?: string) => Effect<Console | Scope, never, void>
```

Added in v1.0.0

## timeLog

**Signature**

```ts
export declare const timeLog: (label?: string, ...args: ReadonlyArray<any>) => Effect<Console, never, void>
```

Added in v1.0.0

## trace

**Signature**

```ts
export declare const trace: (...args: ReadonlyArray<any>) => Effect<Console, never, void>
```

Added in v1.0.0

## warn

**Signature**

```ts
export declare const warn: (...args: ReadonlyArray<any>) => Effect<Console, never, void>
```

Added in v1.0.0

## withGroup

**Signature**

```ts
export declare const withGroup: (options?: {
  label?: string
  collapsed?: boolean
}) => <R, E, A>(self: Effect<R, E, A>) => Effect<Console | R, E, A>
```

Added in v1.0.0

## withTime

**Signature**

```ts
export declare const withTime: (label?: string) => <R, E, A>(self: Effect<R, E, A>) => Effect<Console | R, E, A>
```

Added in v1.0.0

# layer

## layer

**Signature**

```ts
export declare const layer: Layer<never, never, Console>
```

Added in v1.0.0

# model

## Console (interface)

**Signature**

```ts
export interface Console {
  assert(condition: boolean, ...args: ReadonlyArray<any>): Effect<never, never, void>
  clear(): Effect<never, never, void>
  count(label?: string): Effect<never, never, void>
  countReset(label?: string): Effect<never, never, void>
  debug(...args: ReadonlyArray<any>): Effect<never, never, void>
  dir(...args: ReadonlyArray<any>): Effect<never, never, void>
  dirxml(...args: ReadonlyArray<any>): Effect<never, never, void>
  error(...args: ReadonlyArray<any>): Effect<never, never, void>
  group(options?: { readonly label?: string; readonly collapsed?: boolean }): Effect<Scope, never, void>
  info(...args: ReadonlyArray<any>): Effect<never, never, void>
  log(...args: ReadonlyArray<any>): Effect<never, never, void>
  table(tabularData: any, properties?: ReadonlyArray<string>): Effect<never, never, void>
  time(label?: string): Effect<Scope, never, void>
  timeLog(label?: string, ...args: ReadonlyArray<any>): Effect<never, never, void>
  trace(...args: ReadonlyArray<any>): Effect<never, never, void>
  warn(...args: ReadonlyArray<any>): Effect<never, never, void>
  withGroup(options?: {
    readonly label?: string
    readonly collapsed?: boolean
  }): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  withTime(label?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
}
```

Added in v1.0.0

# tag

## Console

**Signature**

```ts
export declare const Console: Context.Tag<Console, Console>
```

Added in v1.0.0
