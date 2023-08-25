/**
 * @since 1.0.0
 */
import * as etag from "@effect/platform-node/Http/Etag"
import * as server from "@effect/platform-node/Http/Server"
import * as app from "@effect/platform/Http/App"
import * as body from "@effect/platform/Http/Body"
import * as formData from "@effect/platform/Http/FormData"
import * as headers from "@effect/platform/Http/Headers"
import * as middleware from "@effect/platform/Http/Middleware"
import * as router from "@effect/platform/Http/Router"
import * as error from "@effect/platform/Http/ServerError"
import * as request from "@effect/platform/Http/ServerRequest"
import * as response from "@effect/platform/Http/ServerResponse"
import * as urlParams from "@effect/platform/Http/UrlParams"

export {
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform/Http/App.ts.html
   * - Module: "@effect/platform/Http/App"
   */
  app,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform/Http/Body.ts.html
   * - Module: "@effect/platform/Http/Body"
   */
  body,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform/Http/ServerError.ts.html
   * - Module: "@effect/platform/Http/ServerError"
   */
  error,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform-node/Http/Etag.ts.html
   * - Module: "@effect/platform-node/Http/Etag"
   */
  etag,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform/Http/FormData.ts.html
   * - Module: "@effect/platform/Http/FormData"
   */
  formData,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform/Http/Headers.ts.html
   * - Module: "@effect/platform/Http/Headers"
   */
  headers,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform/Http/Middleware.ts.html
   * - Module: "@effect/platform/Http/Middleware"
   */
  middleware,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform/Http/ServerRequest.ts.html
   * - Module: "@effect/platform/Http/ServerRequest"
   */
  request,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform/Http/ServerResponse.ts.html
   * - Module: "@effect/platform/Http/ServerResponse"
   */
  response,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform/Http/Router.ts.html
   * - Module: "@effect/platform/Http/Router"
   */
  router,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform-node/Http/Server.ts.html
   * - Module: "@effect/platform-node/Http/Server"
   */
  server,
  /**
   * @since 1.0.0
   *
   * - Docs: https://effect-ts.github.io/platform/platform/Http/UrlParams.ts.html
   * - Module: "@effect/platform/Http/UrlParams"
   */
  urlParams
}
