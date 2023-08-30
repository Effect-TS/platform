import * as Config from "@effect/io/Config"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import * as Runtime from "@effect/io/Runtime"
import type * as Scope from "@effect/io/Scope"
import * as Etag from "@effect/platform-node/Http/Etag"
import * as FormData from "@effect/platform-node/Http/FormData"
import type * as FileSystem from "@effect/platform/FileSystem"
import type * as App from "@effect/platform/Http/App"
import * as Headers from "@effect/platform/Http/Headers"
import * as IncomingMessage from "@effect/platform/Http/IncomingMessage"
import type { Method } from "@effect/platform/Http/Method"
import * as Server from "@effect/platform/Http/Server"
import * as Error from "@effect/platform/Http/ServerError"
import * as ServerRequest from "@effect/platform/Http/ServerRequest"
import type * as ServerResponse from "@effect/platform/Http/ServerResponse"
import * as UrlParams from "@effect/platform/Http/UrlParams"
import type * as Path from "@effect/platform/Path"
import * as Stream from "@effect/stream/Stream"
import type { ServeOptions } from "bun"
import { Readable } from "node:stream"

/** @internal */
export const make = (
  options: Omit<ServeOptions, "fetch" | "error">
): Effect.Effect<Scope.Scope, never, Server.Server> =>
  Effect.gen(function*(_) {
    const server = Bun.serve({
      ...options,
      fetch(_request, _server) {
        return new Response("serve not called", { status: 500 })
      }
    })

    yield* _(Effect.addFinalizer(() => Effect.sync(() => server.stop())))

    console.log("server", server)

    return Server.make({
      address: { _tag: "TcpAddress", port: server.port, hostname: server.hostname },
      serve(httpApp, middleware) {
        const app: App.HttpApp<never, unknown, Response> = Effect.flatMap(
          middleware ? middleware(httpApp) : httpApp,
          respond
        )
        return Effect.flatMap(Effect.runtime<never>(), (runtime) =>
          Effect.async<never, Error.ServeError, never>(() => {
            const runPromise = Runtime.runPromise(runtime)
            server.reload({
              fetch(request, _server) {
                return runPromise(Effect.provideService(
                  app,
                  ServerRequest.ServerRequest,
                  new ServerRequestImpl(request)
                ))
              }
            } as ServeOptions)
          }))
      }
    })
  })

const respond = (response: ServerResponse.ServerResponse) =>
  Effect.sync((): Response => {
    const body = response.body
    switch (body._tag) {
      case "Empty": {
        return new Response(undefined, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        })
      }
      case "Uint8Array":
      case "Raw": {
        return new Response(body.body as any, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        })
      }
      case "FormData": {
        return new Response(body.formData, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        })
      }
      case "Stream": {
        return new Response(Stream.toReadableStream(body.stream), {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        })
      }
    }
  })

/** @internal */
export const layer = (
  options: Omit<ServeOptions, "fetch" | "error">
) =>
  Layer.merge(
    Layer.scoped(Server.Server, make(options)),
    Etag.layer
  )

/** @internal */
export const layerConfig = (
  options: Config.Config.Wrap<Omit<ServeOptions, "fetch" | "error">>
) =>
  Layer.merge(
    Layer.scoped(Server.Server, Effect.flatMap(Effect.config(Config.unwrap(options)), make)),
    Etag.layer
  )

class ServerRequestImpl implements ServerRequest.ServerRequest {
  readonly [ServerRequest.TypeId]: ServerRequest.TypeId
  readonly [IncomingMessage.TypeId]: IncomingMessage.TypeId
  constructor(
    readonly source: Request,
    readonly url = source.url,
    public headersOverride?: Headers.Headers
  ) {
    this[ServerRequest.TypeId] = ServerRequest.TypeId
    this[IncomingMessage.TypeId] = IncomingMessage.TypeId
  }
  get method(): Method {
    return this.source.method as Method
  }
  get originalUrl() {
    return this.source.url
  }
  get headers(): Headers.Headers {
    this.headersOverride ??= Headers.fromInput(this.source.headers)
    return this.headersOverride
  }
  setUrl(url: string): ServerRequest.ServerRequest {
    return new ServerRequestImpl(this.source, url)
  }
  replaceHeaders(headers: Headers.Headers): ServerRequest.ServerRequest {
    return new ServerRequestImpl(this.source, this.url, headers)
  }

  get stream(): Stream.Stream<never, Error.RequestError, Uint8Array> {
    return this.source.body
      ? Stream.fromReadableStream(() => this.source.body!, (_) =>
        Error.RequestError({
          request: this,
          reason: "Decode",
          error: _
        }))
      : Stream.fail(Error.RequestError({
        request: this,
        reason: "Decode",
        error: "can not create stream from empty body"
      }))
  }

  private textEffect: Effect.Effect<never, Error.RequestError, string> | undefined
  get text(): Effect.Effect<never, Error.RequestError, string> {
    if (this.textEffect) {
      return this.textEffect
    }
    this.textEffect = Effect.runSync(Effect.cached(
      Effect.tryPromise({
        try: () => this.source.text(),
        catch: (error) =>
          Error.RequestError({
            request: this,
            reason: "Decode",
            error
          })
      })
    ))
    return this.textEffect
  }

  get json(): Effect.Effect<never, Error.RequestError, unknown> {
    return Effect.tryMap(this.text, {
      try: (_) => JSON.parse(_) as unknown,
      catch: (error) =>
        Error.RequestError({
          request: this,
          reason: "Decode",
          error
        })
    })
  }

  get urlParamsBody(): Effect.Effect<never, Error.RequestError, UrlParams.UrlParams> {
    return Effect.flatMap(this.text, (_) =>
      Effect.try({
        try: () => UrlParams.fromInput(new URLSearchParams(_)),
        catch: (error) =>
          Error.RequestError({
            request: this,
            reason: "Decode",
            error
          })
      }))
  }

  private formDataEffect:
    | Effect.Effect<
      Scope.Scope | FileSystem.FileSystem | Path.Path,
      FormData.FormDataError,
      globalThis.FormData
    >
    | undefined
  get formData(): Effect.Effect<
    Scope.Scope | FileSystem.FileSystem | Path.Path,
    FormData.FormDataError,
    globalThis.FormData
  > {
    if (this.formDataEffect) {
      return this.formDataEffect
    }
    this.formDataEffect = Effect.runSync(Effect.cached(
      FormData.formData(Readable.fromWeb(this.source.body!), this.headers)
    ))
    return this.formDataEffect
  }

  get formDataStream(): Stream.Stream<never, FormData.FormDataError, FormData.Part> {
    return FormData.stream(Readable.fromWeb(this.source.body!), this.headers)
  }

  private arrayBufferEffect: Effect.Effect<never, Error.RequestError, ArrayBuffer> | undefined
  get arrayBuffer(): Effect.Effect<never, Error.RequestError, ArrayBuffer> {
    if (this.arrayBuffer) {
      return this.arrayBuffer
    }
    this.arrayBufferEffect = Effect.runSync(Effect.cached(
      Effect.tryPromise({
        try: () => this.source.arrayBuffer(),
        catch: (error) =>
          Error.RequestError({
            request: this,
            reason: "Decode",
            error
          })
      })
    ))
    return this.arrayBufferEffect
  }
}
