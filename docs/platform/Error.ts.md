---
title: Error.ts
nav_order: 3
parent: "@effect/platform"
---

## Error overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [BadArgument](#badargument)
  - [PermissionDenied](#permissiondenied)
  - [SystemError](#systemerror)
- [models](#models)
  - [BadArgument (interface)](#badargument-interface)
  - [PermissionDenied (interface)](#permissiondenied-interface)
  - [PlatformError (type alias)](#platformerror-type-alias)
  - [SystemError (interface)](#systemerror-interface)
  - [SystemErrorReason (type alias)](#systemerrorreason-type-alias)
- [type id](#type-id)
  - [PlatformErrorTypeId](#platformerrortypeid)
  - [PlatformErrorTypeId (type alias)](#platformerrortypeid-type-alias)

---

# constructor

## BadArgument

**Signature**

```ts
export declare const BadArgument: (props: Omit<BadArgument, PlatformError.ProvidedFields>) => BadArgument
```

Added in v1.0.0

## PermissionDenied

**Signature**

```ts
export declare const PermissionDenied: (props: Omit<PermissionDenied, PlatformError.ProvidedFields>) => PermissionDenied
```

Added in v1.0.0

## SystemError

**Signature**

```ts
export declare const SystemError: (props: Omit<SystemError, PlatformError.ProvidedFields>) => SystemError
```

Added in v1.0.0

# models

## BadArgument (interface)

**Signature**

```ts
export interface BadArgument extends PlatformError.Base {
  readonly _tag: 'BadArgument'
}
```

Added in v1.0.0

## PermissionDenied (interface)

**Signature**

```ts
export interface PermissionDenied extends PlatformError.Base {
  readonly _tag: 'PermissionDenied'
  readonly module: 'FileSystem'
  readonly method: string
  readonly pathOrDescriptor: string | number
}
```

Added in v1.0.0

## PlatformError (type alias)

**Signature**

```ts
export type PlatformError = BadArgument | SystemError | PermissionDenied
```

Added in v1.0.0

## SystemError (interface)

**Signature**

```ts
export interface SystemError extends PlatformError.Base {
  readonly _tag: 'SystemError'
  readonly reason: SystemErrorReason
  readonly pathOrDescriptor: string | number
}
```

Added in v1.0.0

## SystemErrorReason (type alias)

**Signature**

```ts
export type SystemErrorReason =
  | 'AlreadyExists'
  | 'BadResource'
  | 'Busy'
  | 'InvalidData'
  | 'NotFound'
  | 'TimedOut'
  | 'UnexpectedEof'
  | 'WouldBlock'
  | 'WriteZero'
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
