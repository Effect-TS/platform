---
title: Sink.ts
nav_order: 19
parent: "@effect/platform-node"
---

## Sink overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [fromWritable](#fromwritable)
  - [fromWritableChannel](#fromwritablechannel)

---

# constructor

## fromWritable

**Signature**

```ts
export declare const fromWritable: <E, A = string | Uint8Array>(
  evaluate: LazyArg<Writable | NodeJS.WritableStream>,
  onError: (error: unknown) => E,
  options?: FromWritableOptions
) => Sink<never, E, A, never, void>
```

Added in v1.0.0

## fromWritableChannel

**Signature**

```ts
export declare const fromWritableChannel: <IE, OE, A>(
  writable: LazyArg<Writable | NodeJS.WritableStream>,
  onError: (error: unknown) => OE,
  options?: FromWritableOptions
) => Channel<never, IE, Chunk<A>, unknown, IE | OE, Chunk<never>, void>
```

Added in v1.0.0
