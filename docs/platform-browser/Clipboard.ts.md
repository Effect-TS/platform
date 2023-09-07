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
  - [layerLive](#layerlive)
- [tag](#tag)
  - [Clipboard](#clipboard)

---

# constructor

## make

**Signature**

```ts
export declare const make: (impl: Omit<Clipboard, 'clear'>) => Clipboard
```

Added in v1.0.0

# interface

## Clipboard (interface)

**Signature**

```ts
export interface Clipboard {
  read: Effect.Effect<never, PlatformError, ClipboardItems>
  readString: Effect.Effect<never, PlatformError, string>
  write: (text: ClipboardItems) => Effect.Effect<never, PlatformError, void>
  writeString: (text: string) => Effect.Effect<never, PlatformError, void>
  clear: Effect.Effect<never, PlatformError, void>
}
```

Added in v1.0.0

# layers

## layerLive

A layer that directly interfaces with the navigator.clipboard api

**Signature**

```ts
export declare const layerLive: Layer.Layer<never, never, Clipboard>
```

Added in v1.0.0

# tag

## Clipboard

**Signature**

```ts
export declare const Clipboard: Tag<Clipboard, Clipboard>
```

Added in v1.0.0
