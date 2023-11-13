---
title: Terminal.ts
nav_order: 21
parent: "@effect/platform-node"
---

## Terminal overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [layer](#layer)
  - [layer](#layer-1)
- [model](#model)
  - [Key](#key)
  - [UserInput](#userinput)
- [tag](#tag)
  - [Terminal](#terminal)

---

# constructors

## make

**Signature**

```ts
export declare const make: (shouldQuit?: ((input: UserInput) => boolean) | undefined) => Effect<Scope, never, Terminal>
```

Added in v1.0.0

# layer

## layer

**Signature**

```ts
export declare const layer: Layer<never, never, Terminal>
```

Added in v1.0.0

# model

## Key

**Signature**

```ts
export declare const Key: Key
```

Added in v1.0.0

## UserInput

**Signature**

```ts
export declare const UserInput: UserInput
```

Added in v1.0.0

# tag

## Terminal

**Signature**

```ts
export declare const Terminal: Tag<Terminal, Terminal>
```

Added in v1.0.0
