---
title: Path.ts
nav_order: 28
parent: "@effect/platform"
---

## Path overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [layer](#layer)
  - [layer](#layer-1)
- [model](#model)
  - [Path (interface)](#path-interface)
- [tag](#tag)
  - [Path](#path)
- [utils](#utils)
  - [Path (namespace)](#path-namespace)
    - [Parsed (interface)](#parsed-interface)

---

# layer

## layer

An implementation of the Path interface that can be used in all environments
(including browsers).

It uses the POSIX standard for paths.

**Signature**

```ts
export declare const layer: Layer<never, never, Path>
```

Added in v1.0.0

# model

## Path (interface)

**Signature**

```ts
export interface Path {
  readonly sep: string
  readonly basename: (path: string, suffix?: string) => string
  readonly dirname: (path: string) => string
  readonly extname: (path: string) => string
  readonly format: (pathObject: Partial<Path.Parsed>) => string
  readonly fromFileUrl: (url: URL) => Effect<never, BadArgument, string>
  readonly isAbsolute: (path: string) => boolean
  readonly join: (...paths: ReadonlyArray<string>) => string
  readonly normalize: (path: string) => string
  readonly parse: (path: string) => Path.Parsed
  readonly relative: (from: string, to: string) => string
  readonly resolve: (...pathSegments: ReadonlyArray<string>) => string
  readonly toFileUrl: (path: string) => Effect<never, BadArgument, URL>
  readonly toNamespacedPath: (path: string) => string
}
```

Added in v1.0.0

# tag

## Path

**Signature**

```ts
export declare const Path: Tag<Path, Path>
```

Added in v1.0.0

# utils

## Path (namespace)

Added in v1.0.0

### Parsed (interface)

**Signature**

```ts
export interface Parsed {
  readonly root: string
  readonly dir: string
  readonly base: string
  readonly ext: string
  readonly name: string
}
```

Added in v1.0.0
