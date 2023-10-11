---
title: Stream.ts
nav_order: 19
parent: "@effect/platform-node"
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
- [model](#model)
  - [FromWritableOptions (interface)](#fromwritableoptions-interface)
- [models](#models)
  - [FromReadableOptions (interface)](#fromreadableoptions-interface)

---

# combinators

## pipeThroughDuplex

**Signature**

```ts
export declare const pipeThroughDuplex: {
  <E2, B = Uint8Array>(
    duplex: LazyArg<Duplex>,
    onError: (error: unknown) => E2,
    options?: FromReadableOptions & FromWritableOptions
  ): <R, E, A>(self: Stream<R, E, A>) => Stream<R, E2 | E, B>
  <R, E, A, E2, B = Uint8Array>(
    self: Stream<R, E, A>,
    duplex: LazyArg<Duplex>,
    onError: (error: unknown) => E2,
    options?: FromReadableOptions & FromWritableOptions
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
  options?: FromReadableOptions & FromWritableOptions
) => Channel<never, IE, Chunk<I>, unknown, IE | E, Chunk<O>, void>
```

Added in v1.0.0

## fromReadable

**Signature**

```ts
export declare const fromReadable: <E, A = Uint8Array>(
  evaluate: LazyArg<Readable>,
  onError: (error: unknown) => E,
  { chunkSize }?: FromReadableOptions
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

# model

## FromWritableOptions (interface)

**Signature**

```ts
export interface FromWritableOptions {
  readonly endOnDone?: boolean
  readonly encoding?: BufferEncoding
}
```

Added in v1.0.0

# models

## FromReadableOptions (interface)

**Signature**

```ts
export interface FromReadableOptions {
  /** Defaults to undefined, which lets Node.js decide the chunk size */
  readonly chunkSize?: SizeInput
}
```

Added in v1.0.0
