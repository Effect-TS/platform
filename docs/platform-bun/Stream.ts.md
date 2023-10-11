---
title: Stream.ts
nav_order: 16
parent: "@effect/platform-bun"
---

## Stream overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [pipeThroughDuplex](#pipethroughduplex)
- [constructors](#constructors)
  - [fromDuplex](#fromduplex)
  - [fromReadable](#fromreadable)
- [conversions](#conversions)
  - [toString](#tostring)
  - [toUint8Array](#touint8array)
- [models](#models)
  - [FromReadableOptions](#fromreadableoptions)
  - [FromWritableOptions](#fromwritableoptions)

---

# combinators

## pipeThroughDuplex

**Signature**

```ts
export declare const pipeThroughDuplex: {
  <E2, B = Uint8Array>(
    duplex: LazyArg<Duplex>,
    onError: (error: unknown) => E2,
    options?: (FromReadableOptions & FromWritableOptions) | undefined
  ): <R, E, A>(self: Stream<R, E, A>) => Stream<R, E2 | E, B>
  <R, E, A, E2, B = Uint8Array>(
    self: Stream<R, E, A>,
    duplex: LazyArg<Duplex>,
    onError: (error: unknown) => E2,
    options?: (FromReadableOptions & FromWritableOptions) | undefined
  ): Stream<R, E | E2, B>
}
```

Added in v1.0.0

# constructors

## fromDuplex

**Signature**

```ts
export declare const fromDuplex: <IE, E, I = Uint8Array, O = Uint8Array>(
  evaluate: LazyArg<Duplex>,
  onError: (error: unknown) => E,
  options?: (FromReadableOptions & FromWritableOptions) | undefined
) => Channel<never, IE, Chunk<I>, unknown, IE | E, Chunk<O>, void>
```

Added in v1.0.0

## fromReadable

**Signature**

```ts
export declare const fromReadable: <E, A = Uint8Array>(
  evaluate: LazyArg<Readable>,
  onError: (error: unknown) => E,
  { chunkSize }?: FromReadableOptions | undefined
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

## FromWritableOptions

**Signature**

```ts
export declare const FromWritableOptions: FromWritableOptions
```

Added in v1.0.0
