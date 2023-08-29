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
  impl: Omit<KeyValueStore, typeof TypeId | 'has' | 'modify' | 'isEmpty'> & Partial<KeyValueStore>
) => KeyValueStore
```

Added in v1.0.0

# layers

## layerFileSystem

**Signature**

```ts
export declare const layerFileSystem: (
  directory: string
) => Layer.Layer<FileSystem.FileSystem | Path.Path, PlatformError.PlatformError, KeyValueStore>
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
  /**
   * Returns the value of the specified key if it exists.
   */
  readonly get: (key: string) => Effect.Effect<never, PlatformError.PlatformError, Option.Option<string>>

  /**
   * Sets the value of the specified key.
   */
  readonly set: (key: string, value: string) => Effect.Effect<never, PlatformError.PlatformError, void>

  /**
   * Removes the specified key.
   */
  readonly remove: (key: string) => Effect.Effect<never, PlatformError.PlatformError, void>

  /**
   * Removes all entries.
   */
  readonly clear: Effect.Effect<never, PlatformError.PlatformError, void>

  /**
   * Returns the number of entries.
   */
  readonly size: Effect.Effect<never, PlatformError.PlatformError, number>

  /**
   * Updates the value of the specified key if it exists.
   */
  readonly modify: (
    key: string,
    f: (value: string) => string
  ) => Effect.Effect<never, PlatformError.PlatformError, Option.Option<string>>

  /**
   * Returns true if the KeyValueStore contains the specified key.
   */
  readonly has: (key: string) => Effect.Effect<never, PlatformError.PlatformError, boolean>

  /**
   * Checks if the KeyValueStore contains any entries.
   */
  readonly isEmpty: Effect.Effect<never, PlatformError.PlatformError, boolean>
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
