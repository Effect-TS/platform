---
title: Console.ts
nav_order: 1
parent: Modules
---

## Console overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [accessors](#accessors)
  - [log](#log)
- [context](#context)
  - [Console](#console)
- [models](#models)
  - [Console (interface)](#console-interface)

---

# accessors

## log

**Signature**

```ts
export declare const log: (message: any) => Effect.Effect<Console, never, void>
```

Added in v1.0.0

# context

## Console

**Signature**

```ts
export declare const Console: any
```

Added in v1.0.0

# models

## Console (interface)

**Signature**

```ts
export interface Console {
  log(message: any): void
}
```

Added in v1.0.0
