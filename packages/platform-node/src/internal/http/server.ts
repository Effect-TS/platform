import { flow, type LazyArg } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as Fiber from "@effect/io/Fiber"
import * as Layer from "@effect/io/Layer"
import * as Runtime from "@effect/io/Runtime"
import type * as Scope from "@effect/io/Scope"
import * as internalFormData from "@effect/platform-node/internal/http/formData"
import { IncomingMessageImpl } from "@effect/platform-node/internal/http/incomingMessage"
import * as NodeSink from "@effect/platform-node/Sink"
import * as FileSystem from "@effect/platform/FileSystem"
import type * as FormData from "@effect/platform/Http/FormData"
import * as Headers from "@effect/platform/Http/Headers"
import * as IncomingMessage from "@effect/platform/Http/IncomingMessage"
import type { Method } from "@effect/platform/Http/Method"
import * as Middleware from "@effect/platform/Http/Middleware"
import * as Server from "@effect/platform/Http/Server"
import * as Error from "@effect/platform/Http/ServerError"
import * as ServerRequest from "@effect/platform/Http/ServerRequest"
import * as ServerResponse from "@effect/platform/Http/ServerResponse"
import type * as Path from "@effect/platform/Path"
import * as Stream from "@effect/stream/Stream"
import type * as Http from "node:http"
import type * as Net from "node:net"
import { Readable } from "node:stream"

/** @internal */
export const make = (
  evaluate: LazyArg<Http.Server>,
  options: Net.ListenOptions
): Effect.Effect<Scope.Scope, never, Server.Server> =>
  Effect.gen(function*(_) {
    const server = evaluate()

    const serverFiber = yield* _(
      Effect.addFinalizer(() =>
        Effect.async<never, never, void>((resume) => {
          server.close((error) => {
            if (error) {
              resume(Effect.die(error))
            } else {
              resume(Effect.unit)
            }
          })
        })
      ),
      Effect.zipRight(
        Effect.async<never, Error.ServeError, never>((resume) => {
          server.on("error", (error) => {
            resume(Effect.fail(Error.ServeError({ error })))
          })
        })
      ),
      Effect.scoped,
      Effect.forkScoped
    )

    yield* _(Effect.async<never, never, void>((resume) => {
      server.listen(options, () => {
        resume(Effect.unit)
      })
    }))

    const address = server.address()!

    return Server.make({
      address: typeof address === "string" ?
        {
          _tag: "UnixAddress",
          path: address
        } :
        {
          _tag: "TcpAddress",
          hostname: address.address,
          port: address.port
        },
      serve: (httpApp) => {
        const handledApp = Effect.tapErrorCause(httpApp, (_cause) =>
          Effect.flatMap(
            ServerRequest.ServerRequest,
            (request) =>
              Effect.sync(() => {
                const nodeResponse = (request as ServerRequestImpl).response
                if (!nodeResponse.headersSent) {
                  nodeResponse.writeHead(500)
                }
                if (!nodeResponse.writableEnded) {
                  nodeResponse.end()
                }
              })
          ))
        return Effect.flatMap(Effect.runtime(), (runtime) => {
          const runFork = Runtime.runFork(runtime as Runtime.Runtime<unknown>)
          function handler(nodeRequest: Http.IncomingMessage, nodeResponse: Http.ServerResponse) {
            runFork(
              Effect.provideService(
                handledApp,
                ServerRequest.ServerRequest,
                new ServerRequestImpl(nodeRequest, nodeResponse)
              )
            )
          }
          return Effect.all([
            Effect.acquireRelease(
              Effect.sync(() => server.on("request", handler)),
              () => Effect.sync(() => server.off("request", handler))
            ),
            Fiber.join(serverFiber)
          ], { discard: true, concurrency: "unbounded" }) as Effect.Effect<never, Error.ServeError, never>
        })
      }
    })
  }).pipe(
    Effect.locally(
      IncomingMessage.maxBodySize,
      Option.some(FileSystem.Size(1024 * 1024 * 10))
    )
  )

/** @internal */
export const respond = Middleware.make((httpApp) =>
  Effect.flatMap(ServerRequest.ServerRequest, (request) =>
    Effect.tap(
      Effect.flatMap(httpApp, ServerResponse.toNonEffectBody),
      (response) => handleResponse(request, response)
    ))
)

/** @internal */
export const respondServe = flow(respond, Server.serve)

class ServerRequestImpl extends IncomingMessageImpl<Error.RequestError> implements ServerRequest.ServerRequest {
  readonly [ServerRequest.TypeId]: ServerRequest.TypeId = ServerRequest.TypeId

  constructor(
    readonly source: Http.IncomingMessage,
    readonly response: Http.ServerResponse,
    readonly url = source.url!,
    private headersOverride?: Headers.Headers
  ) {
    super(source, (_) =>
      Error.RequestError({
        request: this,
        reason: "Decode",
        error: _
      }))
  }

  get originalUrl(): string {
    return this.source.url!
  }

  get method(): Method {
    return this.source.method as Method
  }

  get headers(): Headers.Headers {
    this.headersOverride ??= Headers.fromInput(this.source.headers as any)
    return this.headersOverride
  }

  get formData(): Effect.Effect<
    Scope.Scope | FileSystem.FileSystem | Path.Path,
    Error.RequestError,
    globalThis.FormData
  > {
    return Effect.mapError(
      internalFormData.formData(this.source),
      (error) =>
        Error.RequestError({
          request: this,
          reason: "Decode",
          error
        })
    )
  }

  get formDataStream(): Stream.Stream<never, Error.RequestError, FormData.Part> {
    return Stream.mapError(
      internalFormData.fromRequest(this.source),
      (error) =>
        Error.RequestError({
          request: this,
          reason: "Decode",
          error
        })
    )
  }

  setUrl(url: string): ServerRequest.ServerRequest {
    return new ServerRequestImpl(
      this.source,
      this.response,
      url,
      this.headersOverride
    )
  }

  replaceHeaders(headers: Headers.Headers): ServerRequest.ServerRequest {
    return new ServerRequestImpl(
      this.source,
      this.response,
      this.url,
      headers
    )
  }

  toString(): string {
    return `ServerRequest(${this.method} ${this.url})`
  }

  toJSON(): unknown {
    return {
      _tag: "ServerRequest",
      method: this.method,
      url: this.url,
      originalUrl: this.originalUrl,
      headers: Object.fromEntries(this.headers)
    }
  }
}

/** @internal */
export const layer = (
  evaluate: LazyArg<Http.Server>,
  options: Net.ListenOptions
) => Layer.scoped(Server.Server, make(evaluate, options))

const handleResponse = (
  request: ServerRequest.ServerRequest,
  response: ServerResponse.ServerResponse.NonEffectBody
) =>
  Effect.suspend((): Effect.Effect<never, Error.ResponseError, void> => {
    const nodeResponse = (request as ServerRequestImpl).response
    switch (response.body._tag) {
      case "Empty": {
        nodeResponse.writeHead(
          response.status,
          response.headers === Headers.empty ? undefined : Object.fromEntries(response.headers)
        )
        nodeResponse.end()
        return Effect.unit
      }
      case "Raw": {
        const headers = response.headers === Headers.empty ? {} : Object.fromEntries(response.headers)
        if (response.body.contentType) {
          headers["content-type"] = response.body.contentType
        }
        if (response.body.contentLength) {
          headers["content-length"] = response.body.contentLength.toString()
        }
        nodeResponse.writeHead(response.status, headers)
        nodeResponse.end(response.body.body)
        return Effect.unit
      }
      case "Uint8Array": {
        const headers = response.headers === Headers.empty ? {} : Object.fromEntries(response.headers)
        headers["content-type"] = response.body.contentType
        headers["content-length"] = response.body.contentLength.toString()
        nodeResponse.writeHead(response.status, headers)
        nodeResponse.end(response.body.body)
        return Effect.unit
      }
      case "FormData": {
        const body = response.body
        return Effect.async<never, Error.ResponseError, void>((resume) => {
          const r = new Response(body.formData)
          const headers = response.headers
            ? Object.fromEntries(response.headers)
            : {}
          headers["content-type"] = r.headers.get("content-type")!
          nodeResponse.writeHead(response.status, headers)
          Readable.fromWeb(r.body as any)
            .pipe(nodeResponse)
            .on("error", (error) => {
              resume(Effect.fail(Error.ResponseError({
                request,
                response,
                reason: "Decode",
                error
              })))
            })
            .once("finish", () => {
              resume(Effect.unit)
            })
        })
      }
      case "Stream": {
        const headers = response.headers === Headers.empty ? {} : Object.fromEntries(response.headers)
        headers["content-type"] = response.body.contentType
        if (response.body.contentLength) {
          headers["content-length"] = response.body.contentLength.toString()
        }
        nodeResponse.writeHead(response.status, headers)
        return Stream.run(
          Stream.mapError(
            response.body.stream,
            (error) =>
              Error.ResponseError({
                request,
                response,
                reason: "Decode",
                error
              })
          ),
          NodeSink.fromWritable(() => nodeResponse, (error) =>
            Error.ResponseError({
              request,
              response,
              reason: "Decode",
              error
            }))
        )
      }
    }
  })
