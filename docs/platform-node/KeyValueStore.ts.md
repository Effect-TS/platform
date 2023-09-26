---
title: KeyValueStore.ts
nav_order: 13
parent: "@effect/platform-node"
---

## KeyValueStore overview

Added in v1.0.0

Also includes exports from [`@effect/platform/KeyValueStore`](https://effect-ts.github.io/platform/platform/KeyValueStore.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [exports](#exports)
  - [From "@effect/platform/KeyValueStore"](#from-effectplatformkeyvaluestore)
- [layers](#layers)
  - [layerFileSystem](#layerfilesystem)

---

# exports

## From "@effect/platform/KeyValueStore"

Re-exports all named exports from the "@effect/platform/KeyValueStore" module.

**Signature**

```ts
export * from '@effect/platform/KeyValueStore'
```

Added in v1.0.0

# layers

## layerFileSystem

**Signature**

```ts
export declare const layerFileSystem: (
  directory: string
) => Layer.Layer<never, PlatformError.PlatformError, KeyValueStore.KeyValueStore>
```

Added in v1.0.0
