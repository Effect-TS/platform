---
title: WebSocket.ts
nav_order: 32
parent: "@effect/platform"
---

## WebSocket overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [Socket (interface)](#socket-interface)
- [tags](#tags)
  - [Socket](#socket)
- [type id](#type-id)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## make

**Signature**

```ts
export declare const make: (impl: Omit<Socket, typeof TypeId>) => Socket
```

Added in v1.0.0

# models

## Socket (interface)

**Signature**

```ts
export interface Socket {
  readonly [TypeId]: TypeId
  send: (data: string | Blob) => Effect.Effect<never, never, void>
  messages: Stream.Stream<never, never, string | Blob | ArrayBuffer>
  errors: Stream.Stream<never, never, Event>
}
```

Added in v1.0.0

# tags

## Socket

**Signature**

```ts
export declare const Socket: Context.Tag<Socket, Socket>
```

Added in v1.0.0

# type id

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
