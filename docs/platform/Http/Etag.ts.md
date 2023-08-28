---
title: Http/Etag.ts
nav_order: 12
parent: "@effect/platform"
---

## Etag overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [convertions](#convertions)
  - [toString](#tostring)
- [models](#models)
  - [Etag (type alias)](#etag-type-alias)
  - [Generator (interface)](#generator-interface)
  - [Strong (interface)](#strong-interface)
  - [Weak (interface)](#weak-interface)
- [tags](#tags)
  - [Generator](#generator)
- [type ids](#type-ids)
  - [GeneratorTypeId](#generatortypeid)
  - [GeneratorTypeId (type alias)](#generatortypeid-type-alias)

---

# convertions

## toString

**Signature**

```ts
export declare const toString: (self: Etag) => string
```

Added in v1.0.0

# models

## Etag (type alias)

**Signature**

```ts
export type Etag = Weak | Strong
```

Added in v1.0.0

## Generator (interface)

**Signature**

```ts
export interface Generator {
  readonly [GeneratorTypeId]: GeneratorTypeId
  readonly fromFileInfo: (info: FileSystem.File.Info) => Effect.Effect<never, never, Etag>
  readonly fromFileWeb: (file: Body.Body.FileLike) => Effect.Effect<never, never, Etag>
}
```

Added in v1.0.0

## Strong (interface)

**Signature**

```ts
export interface Strong {
  readonly _tag: 'Strong'
  readonly value: string
}
```

Added in v1.0.0

## Weak (interface)

**Signature**

```ts
export interface Weak {
  readonly _tag: 'Weak'
  readonly value: string
}
```

Added in v1.0.0

# tags

## Generator

**Signature**

```ts
export declare const Generator: Context.Tag<Generator, Generator>
```

Added in v1.0.0

# type ids

## GeneratorTypeId

**Signature**

```ts
export declare const GeneratorTypeId: typeof GeneratorTypeId
```

Added in v1.0.0

## GeneratorTypeId (type alias)

**Signature**

```ts
export type GeneratorTypeId = typeof GeneratorTypeId
```

Added in v1.0.0
