import { dual } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import type * as App from "@effect/platform/Http/App"
import type * as Middleware from "@effect/platform/Http/Middleware"
import type * as ServerRequest from "@effect/platform/Http/ServerRequest"
import type * as ServerResponse from "@effect/platform/Http/ServerResponse"
import * as internalApp from "@effect/platform/internal/http/app"

/** @internal */
export const fromEffect = <R, EIn, EOut>(
  f: (
    httpApp: App.Default<never, EIn>,
    request: ServerRequest.ServerRequest
  ) => Effect.Effect<R, EOut, ServerResponse.ServerResponse>
): Middleware.Middleware<R, EIn, EOut> =>
(httpApp) => internalApp.make((request) => f(httpApp, request))

/** @internal */
export const logger = fromEffect<never, unknown, unknown>((httpApp, request) =>
  Effect.withLogSpan(
    Effect.tap(
      httpApp(request),
      (response) =>
        Effect.annotateLogs(Effect.log(""), {
          "http.method": request.method,
          "http.url": request.url,
          "http.status": response.status
        })
    ),
    "http.span"
  )
)

/** @internal */
export const tracer = fromEffect<never, unknown, unknown>((httpApp, request) =>
  Effect.withSpan(
    Effect.tap(
      httpApp(request),
      (response) => Effect.annotateCurrentSpan("http.status", response.status)
    ),
    `http ${request.method}`,
    { attributes: { "http.method": request.method, "http.url": request.url } }
  )
)

/** @internal */
export const apply = dual<
  <R2, E, EIn extends E, EOut>(middleware: Middleware.Middleware<R2, EIn, EOut>) => <R>(
    httpApp: App.Default<R, E>
  ) => App.Default<R | R2, unknown extends EOut ? E : EOut>,
  <R, E, R2, EIn extends E, EOut>(
    httpApp: App.Default<R, E>,
    middleware: Middleware.Middleware<R2, EIn, EOut>
  ) => App.Default<R | R2, unknown extends EOut ? E : EOut>
>(2, (httpApp, middleware) => middleware(httpApp as any) as any)

/** @internal */
export const compose = dual<
  <R2, EOut, EIn2 extends EOut, EOut2>(that: Middleware.Middleware<R2, EIn2, EOut2>) => <R, EIn>(
    self: Middleware.Middleware<R, EIn, EOut>
  ) => Middleware.Middleware<R | R2, EIn, EOut2>,
  <R, EIn, EOut, R2, EIn2 extends EOut, EOut2>(
    self: Middleware.Middleware<R, EIn, EOut>,
    that: Middleware.Middleware<R2, EIn2, EOut2>
  ) => Middleware.Middleware<R | R2, EIn, EOut2>
>(2, (self, that) => (inApp) => that(self(inApp) as any))

/** @internal */
export const composeInput = dual<
  <R2, EIn, EIn2, EOut2 extends EIn>(that: Middleware.Middleware<R2, EIn2, EOut2>) => <R, EOut>(
    self: Middleware.Middleware<R, EIn, EOut>
  ) => Middleware.Middleware<R | R2, EIn2, EOut>,
  <R, EIn, EOut, R2, EIn2, EOut2 extends EIn>(
    self: Middleware.Middleware<R, EIn, EOut>,
    that: Middleware.Middleware<R2, EIn2, EOut2>
  ) => Middleware.Middleware<R | R2, EIn2, EOut>
>(2, (self, that) => (inApp) => self(that(inApp) as any))

/** @internal */
export const loggerTracer = compose(tracer, logger)
