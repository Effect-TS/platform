---
title: KeyValueStore.ts
nav_order: 6
parent: "@effect/platform-browser"
---

## KeyValueStore overview

Added in v1.0.0

Also includes exports from [`@effect/platform/KeyValueStore`](https://effect-ts.github.io/platform/platform/KeyValueStore.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [exports](#exports)
  - [From "@effect/platform/KeyValueStore"](#from-effectplatformkeyvaluestore)
- [models](#models)
  - [layerLocalStorage](#layerlocalstorage)
  - [layerSessionStorage](#layersessionstorage)

---

# exports

## From "@effect/platform/KeyValueStore"

Re-exports all named exports from the "@effect/platform/KeyValueStore" module.

**Signature**

```ts
export * from '@effect/platform/KeyValueStore'
```

Added in v1.0.0

# models

## layerLocalStorage

Creates a KeyValueStore layer that uses the browser's localStorage api. Values are stored between sessions.

**Signature**

```ts
export declare const layerLocalStorage: Layer<never, never, KeyValueStore>
```

Added in v1.0.0

## layerSessionStorage

Creates a KeyValueStore layer that uses the browser's sessionStorage api. Values are stored only for the current session.

**Signature**

```ts
export declare const layerSessionStorage: Layer<never, never, KeyValueStore>
```

Added in v1.0.0
