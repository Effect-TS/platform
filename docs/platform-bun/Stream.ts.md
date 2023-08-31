---
title: Stream.ts
nav_order: 15
parent: "@effect/platform-bun"
---

## Stream overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromReadable](#fromreadable)
- [conversions](#conversions)
  - [toString](#tostring)
  - [toUint8Array](#touint8array)
- [models](#models)
  - [FromReadableOptions](#fromreadableoptions)

---

# constructors

## fromReadable

**Signature**

```ts
export declare const fromReadable: <E, A>(
  evaluate: LazyArg<Readable>,
  onError: (error: unknown) => E,
  options?: FromReadableOptions | undefined
) => Stream<never, E, A>
```

Added in v1.0.0

# conversions

## toString

**Signature**

```ts
export declare const toString: <E>(options: {
  readable: LazyArg<Readable>
  onFailure: (error: unknown) => E
  encoding?: BufferEncoding | undefined
  maxBytes?: SizeInput | undefined
}) => Effect<never, E, string>
```

Added in v1.0.0

## toUint8Array

**Signature**

```ts
export declare const toUint8Array: <E>(options: {
  readable: LazyArg<Readable>
  onFailure: (error: unknown) => E
  maxBytes?: SizeInput | undefined
}) => Effect<never, E, Uint8Array>
```

Added in v1.0.0

# models

## FromReadableOptions

**Signature**

```ts
export declare const FromReadableOptions: FromReadableOptions
```

Added in v1.0.0
