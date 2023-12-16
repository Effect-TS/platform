---
title: Http/Headers.ts
nav_order: 14
parent: "@effect/platform"
---

## Headers overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [get](#get)
  - [has](#has)
  - [merge](#merge)
  - [remove](#remove)
  - [set](#set)
  - [setAll](#setall)
- [constructors](#constructors)
  - [empty](#empty)
  - [fromInput](#frominput)
  - [unsafeFromRecord](#unsafefromrecord)
- [models](#models)
  - [Headers (type alias)](#headers-type-alias)
  - [Input (type alias)](#input-type-alias)
- [type ids](#type-ids)
  - [HeadersTypeId](#headerstypeid)
  - [HeadersTypeId (type alias)](#headerstypeid-type-alias)

---

# combinators

## get

**Signature**

```ts
export declare const get: {
  (key: string): (self: Headers) => Option.Option<string>
  (self: Headers, key: string): Option.Option<string>
}
```

Added in v1.0.0

## has

**Signature**

```ts
export declare const has: { (key: string): (self: Headers) => boolean; (self: Headers, key: string): boolean }
```

Added in v1.0.0

## merge

**Signature**

```ts
export declare const merge: {
  (headers: Headers): (self: Headers) => Headers
  (self: Headers, headers: Headers): Headers
}
```

Added in v1.0.0

## remove

**Signature**

```ts
export declare const remove: { (key: string): (self: Headers) => Headers; (self: Headers, key: string): Headers }
```

Added in v1.0.0

## set

**Signature**

```ts
export declare const set: {
  (key: string, value: string): (self: Headers) => Headers
  (self: Headers, key: string, value: string): Headers
}
```

Added in v1.0.0

## setAll

**Signature**

```ts
export declare const setAll: { (headers: Input): (self: Headers) => Headers; (self: Headers, headers: Input): Headers }
```

Added in v1.0.0

# constructors

## empty

**Signature**

```ts
export declare const empty: Headers
```

Added in v1.0.0

## fromInput

**Signature**

```ts
export declare const fromInput: (input?: Input) => Headers
```

Added in v1.0.0

## unsafeFromRecord

**Signature**

```ts
export declare const unsafeFromRecord: (input: ReadonlyRecord.ReadonlyRecord<string>) => Headers
```

Added in v1.0.0

# models

## Headers (type alias)

**Signature**

```ts
export type Headers = Brand.Branded<ReadonlyRecord.ReadonlyRecord<string>, HeadersTypeId>
```

Added in v1.0.0

## Input (type alias)

**Signature**

```ts
export type Input = ReadonlyRecord.ReadonlyRecord<string> | Iterable<readonly [string, string]>
```

Added in v1.0.0

# type ids

## HeadersTypeId

**Signature**

```ts
export declare const HeadersTypeId: typeof HeadersTypeId
```

Added in v1.0.0

## HeadersTypeId (type alias)

**Signature**

```ts
export type HeadersTypeId = typeof HeadersTypeId
```

Added in v1.0.0
