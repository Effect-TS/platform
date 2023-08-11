import type { LazyArg } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as Fiber from "@effect/io/Fiber"
import * as Layer from "@effect/io/Layer"
import * as Runtime from "@effect/io/Runtime"
import type * as Scope from "@effect/io/Scope"
import { IncomingMessageImpl } from "@effect/platform-node/internal/http/incomingMessage"
import * as NodeSink from "@effect/platform-node/Sink"
import * as Headers from "@effect/platform/Http/Headers"
import type { Method } from "@effect/platform/Http/Method"
import * as Server from "@effect/platform/Http/Server"
import * as Error from "@effect/platform/Http/ServerError"
import * as ServerRequest from "@effect/platform/Http/ServerRequest"
import * as ServerResponse from "@effect/platform/Http/ServerResponse"
import * as Stream from "@effect/stream/Stream"
import type * as Http from "node:http"
import type * as Net from "node:net"
import { Readable } from "node:stream"

/** @internal */
export const make = (
  evaluate: LazyArg<Http.Server>,
  options: Net.ListenOptions
): Effect.Effect<Scope.Scope, never, Server.HttpServer> =>
  Effect.gen(function*(_) {
    const scope = yield* _(Effect.scope)
    const server = evaluate()
    const runtime = (yield* _(Effect.runtime<never>())) as Runtime.Runtime<unknown>
    const runFork = Runtime.runFork(runtime)

    const serverFiber = yield* _(
      Effect.gen(function*(_) {
        yield* _(Effect.addFinalizer(() =>
          Effect.async<never, never, void>((resume) => {
            server.close((error) => {
              if (error) {
                resume(Effect.die(error))
              } else {
                resume(Effect.unit)
              }
            })
          })
        ))
        yield* _(Effect.async<never, Error.ServeError, never>((resume) => {
          server.on("error", (error) => {
            resume(Effect.fail(Error.ServeError({ error })))
          })
        }))
      }),
      Effect.scoped,
      Effect.forkIn(scope)
    )

    yield* _(Effect.async<never, never, void>((resume) => {
      server.listen(options, () => {
        resume(Effect.unit)
      })
    }))

    return Server.make((httpApp, _middleware) =>
      Effect.forkIn(
        Effect.all([
          Effect.async<never, never, never>(() => {
            // TODO: handle errors and middleware
            function handler(nodeRequest: Http.IncomingMessage, nodeResponse: Http.ServerResponse) {
              const request = new ServerRequestImpl(nodeRequest)
              runFork(
                Effect.catchAllCause(
                  Effect.tap(
                    Effect.flatMap(
                      httpApp(request),
                      (_) => ServerResponse.toNonEffectBody(_, request)
                    ),
                    (response) => handleResponse(request, response, nodeResponse)
                  ),
                  Effect.logError
                )
              )
            }
            server.on("request", handler)
            return Effect.sync(() => server.off("request", handler))
          }),
          Fiber.join(serverFiber)
        ], { discard: true, concurrency: "unbounded" }) as Effect.Effect<never, Error.ServeError, never>,
        scope
      )
    )
  })

class ServerRequestImpl extends IncomingMessageImpl<Error.RequestError> implements ServerRequest.ServerRequest {
  readonly [ServerRequest.TypeId]: ServerRequest.TypeId = ServerRequest.TypeId

  constructor(
    readonly source: Http.IncomingMessage
  ) {
    super(source, (_) =>
      Error.RequestError({
        request: this,
        reason: "Decode",
        error: _
      }))
  }

  get url(): string {
    return this.source.url!
  }

  get method(): Method {
    return this.source.method as Method
  }
}

/** @internal */
export const layer = (
  evaluate: LazyArg<Http.Server>,
  options: Net.ListenOptions
) => Layer.scoped(Server.HttpServer, make(evaluate, options))

const handleResponse = (
  request: ServerRequest.ServerRequest,
  response: ServerResponse.ServerResponse.NonEffectBody,
  nodeResponse: Http.ServerResponse
) =>
  Effect.suspend(() => {
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
          response.body.stream,
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
