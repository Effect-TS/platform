---
title: Clipboard.ts
nav_order: 1
parent: "@effect/platform-browser"
---

## Clipboard overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [make](#make)
- [interface](#interface)
  - [Clipboard (interface)](#clipboard-interface)
- [layers](#layers)
  - [layer](#layer)
- [tag](#tag)
  - [Clipboard](#clipboard)

---

# constructor

## make

**Signature**

```ts
export declare const make: (impl: Omit<Clipboard, "clear" | "writeBlob">) => Clipboard
```

Added in v1.0.0

# interface

## Clipboard (interface)

**Signature**

```ts
export interface Clipboard {
  readonly read: Effect.Effect<never, PlatformError, ClipboardItems>
  readonly readString: Effect.Effect<never, PlatformError, string>
  readonly write: (items: ClipboardItems) => Effect.Effect<never, PlatformError, void>
  readonly writeString: (text: string) => Effect.Effect<never, PlatformError, void>
  readonly writeBlob: (blob: Blob) => Effect.Effect<never, PlatformError, void>
  readonly clear: Effect.Effect<never, PlatformError, void>
}
```

Added in v1.0.0

# layers

## layer

A layer that directly interfaces with the navigator.clipboard api

**Signature**

```ts
export declare const layer: Layer.Layer<never, never, Clipboard>
```

Added in v1.0.0

# tag

## Clipboard

**Signature**

```ts
export declare const Clipboard: Tag<Clipboard, Clipboard>
```

Added in v1.0.0
