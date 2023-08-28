---
title: KeyValueStore.ts
nav_order: 26
parent: "@effect/platform"
---

## KeyValueStore overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layerFileSystem](#layerfilesystem)
  - [layerMemory](#layermemory)
- [models](#models)
  - [KeyValueStore (interface)](#keyvaluestore-interface)
- [tags](#tags)
  - [KeyValueStore](#keyvaluestore)
- [type id](#type-id)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## make

**Signature**

```ts
export declare const make: (
  impl: Omit<KeyValueStore, typeof TypeId | 'has' | 'setMany' | 'modify' | 'isEmpty'>
) => KeyValueStore
```

Added in v1.0.0

# layers

## layerFileSystem

**Signature**

```ts
export declare const layerFileSystem: (
  directory: string
) => Layer.Layer<FileSystem.FileSystem | Path.Path, never, KeyValueStore>
```

Added in v1.0.0

## layerMemory

**Signature**

```ts
export declare const layerMemory: Layer.Layer<never, never, KeyValueStore>
```

Added in v1.0.0

# models

## KeyValueStore (interface)

**Signature**

```ts
export interface KeyValueStore {
  readonly [TypeId]: TypeId
  readonly get: (key: string) => Effect.Effect<never, PlatformError.PlatformError, Option.Option<string>>
  readonly set: (key: string, value: string) => Effect.Effect<never, PlatformError.PlatformError, void>
  readonly remove: (key: string) => Effect.Effect<never, PlatformError.PlatformError, void>
  readonly clear: Effect.Effect<never, PlatformError.PlatformError, void>
  readonly size: Effect.Effect<never, PlatformError.PlatformError, number>
  /**
   * Updates the value of the specified key if it exists.
   */
  readonly modify: (
    key: string,
    f: (value: string) => string
  ) => Effect.Effect<never, PlatformError.PlatformError, void>
  readonly has: (key: string) => Effect.Effect<never, PlatformError.PlatformError, boolean>
  /**
   * Checks if the KeyValueStore contains any entries.
   */
  readonly isEmpty: Effect.Effect<never, PlatformError.PlatformError, boolean>
  readonly setMany: (values: Record<string, string>) => Effect.Effect<never, PlatformError.PlatformError, void>

  // getMany([fillObj])
  // removeMany(keys[])
}
```

Added in v1.0.0

# tags

## KeyValueStore

**Signature**

```ts
export declare const KeyValueStore: Context.Tag<KeyValueStore, KeyValueStore>
```

Added in v1.0.0

# type id

## TypeId

**Signature**

```ts
export declare const TypeId: typeof TypeId
```

Added in v1.0.0

## TypeId (type alias)

**Signature**

```ts
export type TypeId = typeof TypeId
```

Added in v1.0.0
