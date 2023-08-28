---
title: Runtime.ts
nav_order: 28
parent: "@effect/platform"
---

## Runtime overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [RunMain (interface)](#runmain-interface)
  - [Teardown (interface)](#teardown-interface)
- [teardown](#teardown)
  - [defaultTeardown](#defaultteardown)

---

# model

## RunMain (interface)

**Signature**

```ts
export interface RunMain {
  <E, A>(effect: Effect<never, E, A>, teardown?: Teardown): void
}
```

Added in v1.0.0

## Teardown (interface)

**Signature**

```ts
export interface Teardown {
  <E, A>(exit: Exit.Exit<E, A>, onExit: (code: number) => void): void
}
```

Added in v1.0.0

# teardown

## defaultTeardown

**Signature**

```ts
export declare const defaultTeardown: Teardown
```

Added in v1.0.0
