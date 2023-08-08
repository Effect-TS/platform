import { dual } from "@effect/data/Function"
import { pipeArguments } from "@effect/data/Pipeable"
import type * as Body from "@effect/platform/Http/Body"
import type * as Error from "@effect/platform/Http/ClientError"
import type * as ClientRequest from "@effect/platform/Http/ClientRequest"
import * as Headers from "@effect/platform/Http/Headers"
import type { Method } from "@effect/platform/Http/Method"
import * as UrlParams from "@effect/platform/Http/UrlParams"
import * as internalBody from "@effect/platform/internal/http/body"
import type * as Schema from "@effect/schema/Schema"
import type * as Stream from "@effect/stream/Stream"

/** @internal */
export const TypeId: ClientRequest.TypeId = Symbol.for("@effect/platform/Http/ClientRequest") as ClientRequest.TypeId

class ClientRequestImpl implements ClientRequest.ClientRequest {
  readonly [TypeId]: ClientRequest.TypeId = TypeId
  constructor(
    readonly method: Method,
    readonly url: string,
    readonly urlParams: UrlParams.UrlParams,
    readonly headers: Headers.Headers,
    readonly body: Body.Body
  ) {}
  pipe() {
    return pipeArguments(this, arguments)
  }
}

/** @internal */
export const isClientRequest = (u: unknown): u is ClientRequest.ClientRequest =>
  typeof u === "object" && u !== null && TypeId in u

/** @internal */
export const empty: ClientRequest.ClientRequest = new ClientRequestImpl(
  "GET",
  "",
  UrlParams.empty,
  Headers.empty,
  internalBody.empty
)

/** @internal */
export const make: {
  (method: "GET" | "HEAD"): (url: string, options?: ClientRequest.Options.NoBody) => ClientRequest.ClientRequest
  (
    method: Exclude<Method, "GET" | "HEAD">
  ): (url: string, options?: ClientRequest.Options.NoUrl) => ClientRequest.ClientRequest
} = (method: Method) => (url: string, options?: ClientRequest.Options.NoUrl) =>
  modify(empty, {
    method,
    url,
    ...(options ?? {})
  })

/** @internal */
export const get = make("GET")

/** @internal */
export const post = make("POST")

/** @internal */
export const put = make("PUT")

/** @internal */
export const patch = make("PATCH")

/** @internal */
export const del = make("DELETE")

/** @internal */
export const head = make("HEAD")

/** @internal */
export const options = make("OPTIONS")

/** @internal */
export const modify = dual<
  (options: ClientRequest.Options) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, options: ClientRequest.Options) => ClientRequest.ClientRequest
>(2, (self, options) => {
  let result = self

  if (options.method) {
    result = setMethod(result, options.method)
  }
  if (options.url) {
    result = setUrl(result, options.url)
  }
  if (options.headers) {
    result = setHeaders(result, options.headers)
  }
  if (options.urlParams) {
    result = setUrlParams(result, options.urlParams)
  }
  if (options.body) {
    result = setBody(result, options.body)
  }
  if (options.accept) {
    result = accept(result, options.accept)
  }
  if (options.acceptJson) {
    result = acceptJson(result)
  }

  return result
})

/** @internal */
export const setHeader = dual<
  (key: string, value: string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, key: string, value: string) => ClientRequest.ClientRequest
>(3, (self, key, value) =>
  new ClientRequestImpl(
    self.method,
    self.url,
    self.urlParams,
    Headers.set(self.headers, key, value),
    self.body
  ))

/** @internal */
export const setHeaders = dual<
  (input: Headers.Input) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, input: Headers.Input) => ClientRequest.ClientRequest
>(2, (self, input) =>
  new ClientRequestImpl(
    self.method,
    self.url,
    self.urlParams,
    Headers.setAll(self.headers, input),
    self.body
  ))

/** @internal */
export const basicAuth = dual<
  (username: string, password: string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, username: string, password: string) => ClientRequest.ClientRequest
>(3, (self, username, password) => setHeader(self, "Authorization", `Basic ${btoa(`${username}:${password}`)}`))

/** @internal */
export const accept = dual<
  (mediaType: string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, mediaType: string) => ClientRequest.ClientRequest
>(2, (self, mediaType) => setHeader(self, "Accept", mediaType))

/** @internal */
export const acceptJson = accept("application/json")

/** @internal */
export const setMethod = dual<
  (method: Method) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, method: Method) => ClientRequest.ClientRequest
>(2, (self, method) =>
  new ClientRequestImpl(
    method,
    self.url,
    self.urlParams,
    self.headers,
    self.body
  ))

/** @internal */
export const setUrl = dual<
  (url: string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, url: string) => ClientRequest.ClientRequest
>(2, (self, url) =>
  new ClientRequestImpl(
    self.method,
    url,
    self.urlParams,
    self.headers,
    self.body
  ))

/** @internal */
export const appendUrl = dual<
  (path: string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, path: string) => ClientRequest.ClientRequest
>(2, (self, url) =>
  new ClientRequestImpl(
    self.method,
    self.url + url,
    self.urlParams,
    self.headers,
    self.body
  ))

/** @internal */
export const prependUrl = dual<
  (path: string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, path: string) => ClientRequest.ClientRequest
>(2, (self, url) =>
  new ClientRequestImpl(
    self.method,
    url + self.url,
    self.urlParams,
    self.headers,
    self.body
  ))

/** @internal */
export const updateUrl = dual<
  (f: (url: string) => string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, f: (url: string) => string) => ClientRequest.ClientRequest
>(2, (self, f) =>
  new ClientRequestImpl(
    self.method,
    f(self.url),
    self.urlParams,
    self.headers,
    self.body
  ))

/** @internal */
export const appendUrlParam = dual<
  (key: string, value: string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, key: string, value: string) => ClientRequest.ClientRequest
>(3, (self, key, value) =>
  new ClientRequestImpl(
    self.method,
    self.url,
    UrlParams.append(self.urlParams, key, value),
    self.headers,
    self.body
  ))

/** @internal */
export const appendUrlParams = dual<
  (input: UrlParams.Input) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, input: UrlParams.Input) => ClientRequest.ClientRequest
>(2, (self, input) =>
  new ClientRequestImpl(
    self.method,
    self.url,
    UrlParams.appendAll(self.urlParams, input),
    self.headers,
    self.body
  ))

/** @internal */
export const setUrlParam = dual<
  (key: string, value: string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, key: string, value: string) => ClientRequest.ClientRequest
>(3, (self, key, value) =>
  new ClientRequestImpl(
    self.method,
    self.url,
    UrlParams.set(self.urlParams, key, value),
    self.headers,
    self.body
  ))

/** @internal */
export const setUrlParams = dual<
  (input: UrlParams.Input) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, input: UrlParams.Input) => ClientRequest.ClientRequest
>(2, (self, input) =>
  new ClientRequestImpl(
    self.method,
    self.url,
    UrlParams.setAll(self.urlParams, input),
    self.headers,
    self.body
  ))

/** @internal */
export const setBody = dual<
  (body: Body.Body) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, body: Body.Body) => ClientRequest.ClientRequest
>(2, (self, body) => {
  let headers = self.headers
  if (body._tag === "Empty") {
    headers = Headers.remove(Headers.remove(headers, "Content-Type"), "Content-length")
  } else {
    const contentType = body.contentType
    if (contentType) {
      headers = Headers.set(headers, "content-type", contentType)
    }

    const contentLength = body.contentLength
    if (contentLength) {
      headers = Headers.set(headers, "content-length", contentLength.toString())
    }
  }
  return new ClientRequestImpl(
    self.method,
    self.url,
    self.urlParams,
    headers,
    body
  )
})

/** @internal */
export const binaryBody = dual<
  (body: Uint8Array, contentType?: string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, body: Uint8Array, contentType?: string) => ClientRequest.ClientRequest
>(
  (args) => isClientRequest(args[0]),
  (self, body, contentType = "application/octet-stream") => setBody(self, internalBody.bytes(body, contentType))
)

/** @internal */
export const textBody = dual<
  (body: string, contentType?: string) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, body: string, contentType?: string) => ClientRequest.ClientRequest
>(
  (args) => isClientRequest(args[0]),
  (self, body, contentType = "text/plain") => setBody(self, internalBody.text(body, contentType))
)

/** @internal */
export const jsonBody = dual<
  (body: unknown) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, body: unknown) => ClientRequest.ClientRequest
>(2, (self, body) => setBody(self, internalBody.json(body)))

/** @internal */
export const schemaBody = <I, A>(schema: Schema.Schema<I, A>): {
  (body: A): (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest
  (self: ClientRequest.ClientRequest, body: A): ClientRequest.ClientRequest
} => {
  const encode = internalBody.jsonSchema(schema)
  return dual<
    (body: A) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
    (self: ClientRequest.ClientRequest, body: A) => ClientRequest.ClientRequest
  >(2, (self, body) => setBody(self, encode(body)))
}

/** @internal */
export const urlParamsBody = dual<
  (input: UrlParams.Input) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, input: UrlParams.Input) => ClientRequest.ClientRequest
>(2, (self, body) =>
  setBody(
    self,
    internalBody.text(
      UrlParams.toString(UrlParams.fromInput(body)),
      "application/x-www-form-urlencoded"
    )
  ))

/** @internal */
export const formDataBody = dual<
  (body: FormData) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (self: ClientRequest.ClientRequest, body: FormData) => ClientRequest.ClientRequest
>(2, (self, body) => setBody(self, internalBody.formData(body)))

/** @internal */
export const streamBody = dual<
  (
    body: Stream.Stream<never, Error.RequestError, Uint8Array>,
    options?: {
      readonly contentType?: string
      readonly contentLength?: number
    }
  ) => (self: ClientRequest.ClientRequest) => ClientRequest.ClientRequest,
  (
    self: ClientRequest.ClientRequest,
    body: Stream.Stream<never, Error.RequestError, Uint8Array>,
    options?: {
      readonly contentType?: string
      readonly contentLength?: number
    }
  ) => ClientRequest.ClientRequest
>(
  (args) => isClientRequest(args[0]),
  (self, body, { contentLength, contentType = "application/octet-stream" } = {}) =>
    setBody(self, internalBody.stream(body, contentType, contentLength))
)
