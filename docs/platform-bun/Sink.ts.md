---
title: Sink.ts
nav_order: 16
parent: "@effect/platform-bun"
---

## Sink overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [fromWritable](#fromwritable)

---

# constructor

## fromWritable

**Signature**

```ts
export declare const fromWritable: <E, A = string | Uint8Array>(
  evaluate: LazyArg<Writable<any> | NodeJS.WritableStream>,
  onError: (error: unknown) => E,
  options?: FromWritableOptions | undefined
) => Sink<never, E, A, never, void>
```

Added in v1.0.0
