import { dual } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import type * as App from "@effect/platform/Http/App"
import * as Headers from "@effect/platform/Http/Headers"
import type * as Middleware from "@effect/platform/Http/Middleware"
import * as internalApp from "@effect/platform/internal/http/app"

/** @internal */
export const make = <M extends Middleware.Middleware>(middleware: M): M => middleware

/** @internal */
export const logger = make(<R, E>(httpApp: App.Default<R, E>) =>
  internalApp.makeDefault((request) =>
    Effect.withLogSpan(
      Effect.onExit(
        httpApp.handler(request),
        (exit) =>
          Effect.annotateLogs(Effect.log("", exit._tag === "Failure" ? exit.cause : undefined), {
            "http.method": request.method,
            "http.url": request.url,
            "http.status": exit._tag === "Success" ? exit.value.status : 500
          })
      ),
      "http.span"
    )
  )
)

/** @internal */
export const tracer = make(<R, E>(httpApp: App.Default<R, E>) =>
  internalApp.makeDefault((request) =>
    Effect.withSpan(
      Effect.tap(
        httpApp.handler(request),
        (response) => Effect.annotateCurrentSpan("http.status", response.status)
      ),
      `http ${request.method}`,
      { attributes: { "http.method": request.method, "http.url": request.url } }
    )
  )
)

/** @internal */
export const xForwardedHeaders = make((httpApp) =>
  internalApp.makeDefault((request) => {
    const forwardedHost = Headers.get(request.headers, "x-forwarded-host")
    return forwardedHost._tag === "Some"
      ? httpApp.handler(request.replaceHeaders(Headers.set(request.headers, "host", forwardedHost.value)))
      : httpApp.handler(request)
  })
)

/** @internal */
export const compose = dual<
  <B extends App.Default<any, any>, C extends App.Default<any, any>>(
    that: (b: B) => C
  ) => <A extends App.Default<any, any>>(
    self: (a: A) => B
  ) => (a: A) => C,
  <A extends App.Default<any, any>, B extends App.Default<any, any>, C extends App.Default<any, any>>(
    self: (a: A) => B,
    that: (b: B) => C
  ) => (a: A) => C
>(2, (self, that) => (inApp) => that(self(inApp)))

/** @internal */
export const loggerTracer = compose(tracer, logger)
