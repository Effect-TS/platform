---
title: Error.ts
nav_order: 3
parent: "@effect/platform-browser"
---

## Error overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [error](#error)
  - [BadArgument](#badargument)
  - [SystemError](#systemerror)
- [model](#model)
  - [PlatformError](#platformerror)
  - [SystemErrorReason](#systemerrorreason)
- [type id](#type-id)
  - [PlatformErrorTypeId](#platformerrortypeid)

---

# error

## BadArgument

**Signature**

```ts
export declare const BadArgument: (props: Omit<BadArgument, PlatformError.ProvidedFields>) => BadArgument
```

Added in v1.0.0

## SystemError

**Signature**

```ts
export declare const SystemError: (props: Omit<SystemError, PlatformError.ProvidedFields>) => SystemError
```

Added in v1.0.0

# model

## PlatformError

**Signature**

```ts
export declare const PlatformError: PlatformError
```

Added in v1.0.0

## SystemErrorReason

**Signature**

```ts
export declare const SystemErrorReason: SystemErrorReason
```

Added in v1.0.0

# type id

## PlatformErrorTypeId

**Signature**

```ts
export declare const PlatformErrorTypeId: typeof PlatformErrorTypeId
```

Added in v1.0.0
