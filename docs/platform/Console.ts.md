---
title: Console.ts
nav_order: 1
parent: "@effect/platform"
---

## Console overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [layer](#layer)
  - [layer](#layer-1)
- [model](#model)
  - [Console (interface)](#console-interface)
- [tag](#tag)
  - [Console](#console)

---

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
  assert(condition: boolean, ...args: Array<any>): Effect<never, never, void>
  clear(): Effect<never, never, void>
  count(label?: string): Effect<never, never, void>
  countReset(label?: string): Effect<never, never, void>
  debug(...args: Array<any>): Effect<never, never, void>
  dir(...args: Array<any>): Effect<never, never, void>
  dirxml(...args: Array<any>): Effect<never, never, void>
  error(...args: Array<any>): Effect<never, never, void>
  group(options?: {
    readonly label?: string
    readonly collapsed?: boolean
  }): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  info(...args: Array<any>): Effect<never, never, void>
  log(...args: Array<any>): Effect<never, never, void>
  table(tabularData: any, properties?: ReadonlyArray<string>): Effect<never, never, void>
  time(label?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, A>
  timeLog(label?: string, ...args: Array<any>): Effect<never, never, void>
  trace(...args: Array<any>): Effect<never, never, void>
  warn(...args: Array<any>): Effect<never, never, void>
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
