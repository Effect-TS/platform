---
title: Console.ts
nav_order: 1
parent: "@effect/platform"
---

## Console overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Console (interface)](#console-interface)
- [tag](#tag)
  - [Console](#console)

---

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

# tag

## Console

**Signature**

```ts
export declare const Console: Context.Tag<Console, Console>
```

Added in v1.0.0
