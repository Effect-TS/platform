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
- [predicates](#predicates)
  - [isTransferable](#istransferable)
- [schema](#schema)
  - [schema](#schema-1)
  - [schemaFromSelf](#schemafromself)
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

# predicates

## isTransferable

**Signature**

```ts
export declare const isTransferable: (u: unknown) => u is Transferable
```

Added in v1.0.0

# schema

## schema

**Signature**

```ts
export declare const schema: {
  <A>(
    f: (_: A) => ReadonlyArray<globalThis.Transferable>
  ): <I>(self: Schema.Schema<I, A>) => Schema.Schema<I, A & Transferable>
  <I, A>(
    self: Schema.Schema<I, A>,
    f: (_: A) => ReadonlyArray<globalThis.Transferable>
  ): Schema.Schema<I, A & Transferable>
}
```

Added in v1.0.0

## schemaFromSelf

**Signature**

```ts
export declare const schemaFromSelf: <I, A>(
  item: Schema.Schema<I, A>
) => Schema.Schema<I & Transferable, A & Transferable>
```

Added in v1.0.0

# symbols

## symbol

**Signature**

```ts
export declare const symbol: typeof symbol
```

Added in v1.0.0
