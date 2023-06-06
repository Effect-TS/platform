---
title: Console.ts
nav_order: 1
parent: "@effect/platform"
---

## Console overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [context](#context)
  - [Console](#console)
- [model](#model)
  - [Console (interface)](#console-interface)

---

# context

## Console

**Signature**

```ts
export declare const Console: Context.Tag<Console, Console>
```

Added in v1.0.0

# model

## Console (interface)

**Signature**

```ts
export interface Console {
  log(...args: Array<any>): void
  logError(...args: Array<any>): void
}
```

Added in v1.0.0
