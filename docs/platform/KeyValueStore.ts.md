---
title: KeyValueStore.ts
nav_order: 26
parent: "@effect/platform"
---

## KeyValueStore overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [prefix](#prefix)
- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layerFileSystem](#layerfilesystem)
  - [layerMemory](#layermemory)
  - [layerSchema](#layerschema)
- [models](#models)
  - [KeyValueStore (interface)](#keyvaluestore-interface)
  - [SchemaStore (interface)](#schemastore-interface)
- [tags](#tags)
  - [KeyValueStore](#keyvaluestore)
- [type id](#type-id)
  - [SchemaStoreTypeId](#schemastoretypeid)
  - [SchemaStoreTypeId (type alias)](#schemastoretypeid-type-alias)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# combinators

## prefix

**Signature**

```ts
export declare const prefix: {
  (prefix: string): <S extends KeyValueStore.AnyStore>(self: S) => S
  <S extends KeyValueStore.AnyStore>(self: S, prefix: string): S
}
```

Added in v1.0.0

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

## layerSchema

**Signature**

```ts
export declare const layerSchema: <I, A>(
  schema: Schema.Schema<I, A>,
  tagIdentifier?: unknown
) => {
  readonly tag: Context.Tag<SchemaStore<A>, SchemaStore<A>>
  readonly layer: Layer.Layer<KeyValueStore, never, SchemaStore<A>>
}
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

  /**
   * Create a SchemaStore for the specified schema.
   */
  readonly forSchema: <I, A>(schema: Schema.Schema<I, A>) => SchemaStore<A>
}
```

Added in v1.0.0

## SchemaStore (interface)

**Signature**

```ts
export interface SchemaStore<A> {
  readonly [SchemaStoreTypeId]: SchemaStoreTypeId
  /**
   * Returns the value of the specified key if it exists.
   */
  readonly get: (
    key: string
  ) => Effect.Effect<never, PlatformError.PlatformError | ParseResult.ParseError, Option.Option<A>>

  /**
   * Sets the value of the specified key.
   */
  readonly set: (
    key: string,
    value: A
  ) => Effect.Effect<never, PlatformError.PlatformError | ParseResult.ParseError, void>

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
    f: (value: A) => A
  ) => Effect.Effect<never, PlatformError.PlatformError | ParseResult.ParseError, Option.Option<A>>

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

## SchemaStoreTypeId

**Signature**

```ts
export declare const SchemaStoreTypeId: typeof SchemaStoreTypeId
```

Added in v1.0.0

## SchemaStoreTypeId (type alias)

**Signature**

```ts
export type SchemaStoreTypeId = typeof SchemaStoreTypeId
```

Added in v1.0.0

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
