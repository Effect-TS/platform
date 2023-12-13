---
title: Error.ts
nav_order: 4
parent: "@effect/platform"
---

## Error overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [error](#error)
  - [BadArgument](#badargument)
  - [BadArgument (interface)](#badargument-interface)
  - [PlatformError (type alias)](#platformerror-type-alias)
  - [SystemError](#systemerror)
- [model](#model)
  - [SystemErrorReason (type alias)](#systemerrorreason-type-alias)
- [models](#models)
  - [SystemError (interface)](#systemerror-interface)
- [type id](#type-id)
  - [PlatformErrorTypeId](#platformerrortypeid)
  - [PlatformErrorTypeId (type alias)](#platformerrortypeid-type-alias)
- [utils](#utils)
  - [PlatformError (namespace)](#platformerror-namespace)
    - [Base (interface)](#base-interface)
    - [ProvidedFields (type alias)](#providedfields-type-alias)

---

# error

## BadArgument

**Signature**

```ts
export declare const BadArgument: (props: Omit<BadArgument, PlatformError.ProvidedFields>) => BadArgument
```

Added in v1.0.0

## BadArgument (interface)

**Signature**

```ts
export interface BadArgument extends PlatformError.Base {
  readonly _tag: "BadArgument"
}
```

Added in v1.0.0

## PlatformError (type alias)

**Signature**

```ts
export type PlatformError = BadArgument | SystemError
```

Added in v1.0.0

## SystemError

**Signature**

```ts
export declare const SystemError: (props: Omit<SystemError, PlatformError.ProvidedFields>) => SystemError
```

Added in v1.0.0

# model

## SystemErrorReason (type alias)

**Signature**

```ts
export type SystemErrorReason =
  | "AlreadyExists"
  | "BadResource"
  | "Busy"
  | "InvalidData"
  | "NotFound"
  | "PermissionDenied"
  | "TimedOut"
  | "UnexpectedEof"
  | "Unknown"
  | "WouldBlock"
  | "WriteZero"
```

Added in v1.0.0

# models

## SystemError (interface)

**Signature**

```ts
export interface SystemError extends PlatformError.Base {
  readonly _tag: "SystemError"
  readonly reason: SystemErrorReason
  readonly syscall?: string
  readonly pathOrDescriptor: string | number
}
```

Added in v1.0.0

# type id

## PlatformErrorTypeId

**Signature**

```ts
export declare const PlatformErrorTypeId: typeof PlatformErrorTypeId
```

Added in v1.0.0

## PlatformErrorTypeId (type alias)

**Signature**

```ts
export type PlatformErrorTypeId = typeof PlatformErrorTypeId
```

Added in v1.0.0

# utils

## PlatformError (namespace)

Added in v1.0.0

### Base (interface)

**Signature**

```ts
export interface Base extends Data.Case {
  readonly [PlatformErrorTypeId]: typeof PlatformErrorTypeId
  readonly _tag: string
  readonly module:
    | "Clipboard"
    | "Command"
    | "FileSystem"
    | "KeyValueStore"
    | "Path"
    | "Stream"
    | "Terminal"
    | "WebSocket"
  readonly method: string
  readonly message: string
}
```

Added in v1.0.0

### ProvidedFields (type alias)

**Signature**

```ts
export type ProvidedFields = PlatformErrorTypeId | "_tag" | keyof Data.Case
```

Added in v1.0.0
