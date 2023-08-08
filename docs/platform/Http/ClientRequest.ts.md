---
title: Http/ClientRequest.ts
nav_order: 10
parent: "@effect/platform"
---

## ClientRequest overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [accept](#accept)
  - [acceptJson](#acceptjson)
  - [appendUrl](#appendurl)
  - [appendUrlParam](#appendurlparam)
  - [appendUrlParams](#appendurlparams)
  - [basicAuth](#basicauth)
  - [binaryBody](#binarybody)
  - [formDataBody](#formdatabody)
  - [jsonBody](#jsonbody)
  - [modify](#modify)
  - [prependUrl](#prependurl)
  - [schemaBody](#schemabody)
  - [setBody](#setbody)
  - [setHeader](#setheader)
  - [setHeaders](#setheaders)
  - [setMethod](#setmethod)
  - [setUrl](#seturl)
  - [setUrlParam](#seturlparam)
  - [setUrlParams](#seturlparams)
  - [streamBody](#streambody)
  - [textBody](#textbody)
  - [updateUrl](#updateurl)
  - [urlParamsBody](#urlparamsbody)
- [constructors](#constructors)
  - [del](#del)
  - [get](#get)
  - [head](#head)
  - [make](#make)
  - [options](#options)
  - [patch](#patch)
  - [post](#post)
  - [put](#put)
- [models](#models)
  - [ClientRequest (interface)](#clientrequest-interface)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# combinators

## accept

**Signature**

```ts
export declare const accept: {
  (mediaType: string): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, mediaType: string): ClientRequest
}
```

Added in v1.0.0

## acceptJson

**Signature**

```ts
export declare const acceptJson: (self: ClientRequest) => ClientRequest
```

Added in v1.0.0

## appendUrl

**Signature**

```ts
export declare const appendUrl: {
  (path: string): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, path: string): ClientRequest
}
```

Added in v1.0.0

## appendUrlParam

**Signature**

```ts
export declare const appendUrlParam: ((key: string, value: string) => (self: ClientRequest) => ClientRequest) &
  ((self: ClientRequest, key: string, value: string) => ClientRequest)
```

Added in v1.0.0

## appendUrlParams

**Signature**

```ts
export declare const appendUrlParams: ((input: UrlParams.Input) => (self: ClientRequest) => ClientRequest) &
  ((self: ClientRequest, input: UrlParams.Input) => ClientRequest)
```

Added in v1.0.0

## basicAuth

**Signature**

```ts
export declare const basicAuth: {
  (username: string, password: string): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, username: string, password: string): ClientRequest
}
```

Added in v1.0.0

## binaryBody

**Signature**

```ts
export declare const binaryBody: {
  (body: Uint8Array, contentType?: string): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, body: Uint8Array, contentType?: string): ClientRequest
}
```

Added in v1.0.0

## formDataBody

**Signature**

```ts
export declare const formDataBody: {
  (body: FormData): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, body: FormData): ClientRequest
}
```

Added in v1.0.0

## jsonBody

**Signature**

```ts
export declare const jsonBody: {
  (body: unknown): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, body: string): ClientRequest
}
```

Added in v1.0.0

## modify

**Signature**

```ts
export declare const modify: {
  (options: {
    readonly method?: Method
    readonly url?: string
    readonly urlParams?: UrlParams.Input
    readonly headers?: Headers.Input
    readonly body?: Body.Body
    readonly accept?: string
    readonly acceptJson?: boolean
  }): (self: ClientRequest) => ClientRequest
  (
    self: ClientRequest,
    options: {
      readonly method?: Method
      readonly url?: string
      readonly urlParams?: UrlParams.Input
      readonly headers?: Headers.Input
      readonly body?: Body.Body
      readonly accept?: string
      readonly acceptJson?: boolean
    }
  ): ClientRequest
}
```

Added in v1.0.0

## prependUrl

**Signature**

```ts
export declare const prependUrl: {
  (path: string): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, path: string): ClientRequest
}
```

Added in v1.0.0

## schemaBody

**Signature**

```ts
export declare const schemaBody: <I, A>(
  schema: Schema.Schema<I, A>
) => { (body: A): (self: ClientRequest) => ClientRequest; (self: ClientRequest, body: A): ClientRequest }
```

Added in v1.0.0

## setBody

**Signature**

```ts
export declare const setBody: {
  (body: Body.Body): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, body: Body.Body): ClientRequest
}
```

Added in v1.0.0

## setHeader

**Signature**

```ts
export declare const setHeader: {
  (key: string, value: string): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, key: string, value: string): ClientRequest
}
```

Added in v1.0.0

## setHeaders

**Signature**

```ts
export declare const setHeaders: {
  (input: Headers.Input): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, input: Headers.Input): ClientRequest
}
```

Added in v1.0.0

## setMethod

**Signature**

```ts
export declare const setMethod: {
  (method: Method): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, method: Method): ClientRequest
}
```

Added in v1.0.0

## setUrl

**Signature**

```ts
export declare const setUrl: {
  (url: string): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, url: string): ClientRequest
}
```

Added in v1.0.0

## setUrlParam

**Signature**

```ts
export declare const setUrlParam: ((key: string, value: string) => (self: ClientRequest) => ClientRequest) &
  ((self: ClientRequest, key: string, value: string) => ClientRequest)
```

Added in v1.0.0

## setUrlParams

**Signature**

```ts
export declare const setUrlParams: ((input: UrlParams.Input) => (self: ClientRequest) => ClientRequest) &
  ((self: ClientRequest, input: UrlParams.Input) => ClientRequest)
```

Added in v1.0.0

## streamBody

**Signature**

```ts
export declare const streamBody: {
  (
    body: Stream.Stream<never, Error.RequestError, Uint8Array>,
    options?: { readonly contentType?: string; readonly contentLength?: number }
  ): (self: ClientRequest) => ClientRequest
  (
    self: ClientRequest,
    body: Stream.Stream<never, Error.RequestError, Uint8Array>,
    options?: { readonly contentType?: string; readonly contentLength?: number }
  ): ClientRequest
}
```

Added in v1.0.0

## textBody

**Signature**

```ts
export declare const textBody: {
  (body: string, contentType?: string): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, body: string, contentType?: string): ClientRequest
}
```

Added in v1.0.0

## updateUrl

**Signature**

```ts
export declare const updateUrl: {
  (f: (url: string) => string): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, f: (url: string) => string): ClientRequest
}
```

Added in v1.0.0

## urlParamsBody

**Signature**

```ts
export declare const urlParamsBody: {
  (input: UrlParams.Input): (self: ClientRequest) => ClientRequest
  (self: ClientRequest, input: UrlParams.Input): ClientRequest
}
```

Added in v1.0.0

# constructors

## del

**Signature**

```ts
export declare const del: (
  url: string,
  options?: {
    readonly url?: string
    readonly urlParams?: UrlParams.Input
    readonly headers?: Headers.Input
    readonly accept?: string
    readonly acceptJson?: boolean
  }
) => ClientRequest
```

Added in v1.0.0

## get

**Signature**

```ts
export declare const get: (
  url: string,
  options?: {
    readonly url?: string
    readonly urlParams?: UrlParams.Input
    readonly headers?: Headers.Input
    readonly accept?: string
    readonly acceptJson?: boolean
  }
) => ClientRequest
```

Added in v1.0.0

## head

**Signature**

```ts
export declare const head: (
  url: string,
  options?: {
    readonly url?: string
    readonly urlParams?: UrlParams.Input
    readonly headers?: Headers.Input
    readonly accept?: string
    readonly acceptJson?: boolean
  }
) => ClientRequest
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: (
  method: Method
) => (
  url: string,
  options?:
    | {
        readonly url?: string | undefined
        readonly urlParams?: UrlParams.Input | undefined
        readonly headers?: Headers.Input | undefined
        readonly body?: Body.Body | undefined
        readonly accept?: string | undefined
        readonly acceptJson?: boolean | undefined
      }
    | undefined
) => ClientRequest
```

Added in v1.0.0

## options

**Signature**

```ts
export declare const options: (
  url: string,
  options?: {
    readonly url?: string
    readonly urlParams?: UrlParams.Input
    readonly headers?: Headers.Input
    readonly accept?: string
    readonly acceptJson?: boolean
  }
) => ClientRequest
```

Added in v1.0.0

## patch

**Signature**

```ts
export declare const patch: (
  url: string,
  options?: {
    readonly url?: string
    readonly urlParams?: UrlParams.Input
    readonly headers?: Headers.Input
    readonly body?: Body.Body
    readonly accept?: string
    readonly acceptJson?: boolean
  }
) => ClientRequest
```

Added in v1.0.0

## post

**Signature**

```ts
export declare const post: (
  url: string,
  options?: {
    readonly url?: string
    readonly urlParams?: UrlParams.Input
    readonly headers?: Headers.Input
    readonly body?: Body.Body
    readonly accept?: string
    readonly acceptJson?: boolean
  }
) => ClientRequest
```

Added in v1.0.0

## put

**Signature**

```ts
export declare const put: (
  url: string,
  options?: {
    readonly url?: string
    readonly urlParams?: UrlParams.Input
    readonly headers?: Headers.Input
    readonly body?: Body.Body
    readonly accept?: string
    readonly acceptJson?: boolean
  }
) => ClientRequest
```

Added in v1.0.0

# models

## ClientRequest (interface)

**Signature**

```ts
export interface ClientRequest extends Pipeable {
  readonly [TypeId]: TypeId
  readonly method: Method
  readonly url: string
  readonly urlParams: UrlParams.UrlParams
  readonly headers: Headers.Headers
  readonly body: Body.Body
}
```

Added in v1.0.0

# type ids

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
