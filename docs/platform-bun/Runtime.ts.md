---
title: Runtime.ts
nav_order: 15
parent: "@effect/platform-bun"
---

## Runtime overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [RunMain](#runmain)
  - [Teardown](#teardown)
- [runtime](#runtime)
  - [runMain](#runmain-1)
- [teardown](#teardown-1)
  - [defaultTeardown](#defaultteardown)
- [utils](#utils)
  - [interruptAll](#interruptall)

---

# model

## RunMain

**Signature**

```ts
export declare const RunMain: RunMain
```

Added in v1.0.0

## Teardown

**Signature**

```ts
export declare const Teardown: Teardown
```

Added in v1.0.0

# runtime

## runMain

**Signature**

```ts
export declare const runMain: RunMain
```

Added in v1.0.0

# teardown

## defaultTeardown

**Signature**

```ts
export declare const defaultTeardown: Teardown
```

Added in v1.0.0

# utils

## interruptAll

**Signature**

```ts
export declare const interruptAll: (id: FiberId) => Effect<never, never, void>
```

Added in v1.0.0
