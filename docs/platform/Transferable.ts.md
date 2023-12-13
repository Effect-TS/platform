---
title: Transferable.ts
nav_order: 31
parent: "@effect/platform"
---

## Transferable overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [accessors](#accessors)
  - [get](#get)
- [models](#models)
  - [Transferable (interface)](#transferable-interface)
- [symbols](#symbols)
  - [symbol](#symbol)

---

# accessors

## get

**Signature**

```ts
export declare const get: (u: unknown) => ReadonlyArray<globalThis.Transferable>
```

Added in v1.0.0

# models

## Transferable (interface)

**Signature**

```ts
export interface Transferable {
  readonly [symbol]: () => ReadonlyArray<globalThis.Transferable>
}
```

Added in v1.0.0

# symbols

## symbol

**Signature**

```ts
export declare const symbol: typeof symbol
```

Added in v1.0.0
