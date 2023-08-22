---
title: Http/Etag.ts
nav_order: 12
parent: "@effect/platform"
---

## Etag overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [models](#models)
  - [EtagGenerator (interface)](#etaggenerator-interface)
- [tags](#tags)
  - [EtagGenerator](#etaggenerator)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# models

## EtagGenerator (interface)

**Signature**

```ts
export interface EtagGenerator {
  readonly [TypeId]: TypeId
  readonly fromFileInfo: (info: FileSystem.File.Info) => Effect.Effect<never, never, string>
}
```

Added in v1.0.0

# tags

## EtagGenerator

**Signature**

```ts
export declare const EtagGenerator: Context.Tag<EtagGenerator, EtagGenerator>
```

Added in v1.0.0

# type ids

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
