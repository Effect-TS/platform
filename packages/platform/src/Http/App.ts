/**
 * @since 1.0.0
 */
import type { Pipeable } from "@effect/data/Pipeable"
import type * as Effect from "@effect/io/Effect"
import type * as ServerRequest from "@effect/platform/Http/ServerRequest"
import type * as ServerResponse from "@effect/platform/Http/ServerResponse"
import * as internal from "@effect/platform/internal/http/app"

/**
 * @since 1.0.0
 * @category models
 */
export interface HttpApp<R, E, In, Out> extends Pipeable {
  (request: In): Effect.Effect<R, E, Out>
}

/**
 * @since 1.0.0
 */
export namespace HttpApp {
  /**
   * @since 1.0.0
   * @category models
   */
  export type Default<R> = HttpApp<R, never, ServerRequest.ServerRequest, ServerResponse.ServerResponse>

  /**
   * @since 1.0.0
   * @category models
   */
  export type Middleware<R, E> = HttpApp<R, E, ServerRequest.ServerRequest, ServerResponse.ServerResponse>

  /**
   * @since 1.0.0
   * @category models
   */
  export type RequestMiddleware<R, E> = HttpApp<R, E, ServerRequest.ServerRequest, ServerRequest.ServerRequest>

  /**
   * @since 1.0.0
   * @category models
   */
  export type ResponseMiddleware<R, E> = HttpApp<R, E, ServerResponse.ServerResponse, ServerResponse.ServerResponse>
}

/**
 * @since 1.0.0
 * @category error handling
 */
export const catchTag: {
  <E extends { _tag: string }, K extends E["_tag"] & string, In, InX extends In, R1, E1, A1>(
    tag: K,
    f: (e: Extract<E, { _tag: K }>, request: InX) => Effect.Effect<R1, E1, A1>
  ): <R, A>(self: HttpApp<R, E, In, A>) => HttpApp<R1 | R, E1 | Exclude<E, { _tag: K }>, In, A1 | A>
  <R, E extends { _tag: string }, In, A, K extends E["_tag"] & string, InX extends In, E1, R1, A1>(
    self: HttpApp<R, E, In, A>,
    tag: K,
    f: (e: Extract<E, { _tag: K }>, request: InX) => Effect.Effect<R1, E1, A1>
  ): HttpApp<R | R1, E1 | Exclude<E, { _tag: K }>, In, A | A1>
} = internal.catchTag

/**
 * @since 1.0.0
 * @category error handling
 */
export const catchTags: {
  <
    E extends { _tag: string },
    Cases extends { [K in E["_tag"]]+?: ((error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>) | undefined }
  >(
    cases: Cases
  ): <R, In, A>(
    self: HttpApp<R, E, In, A>
  ) => HttpApp<
    | R
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<infer R, any, any> ? R : never
    }[keyof Cases],
    | Exclude<E, {
      _tag: keyof Cases /**
       * @since 1.0.0
       * @category combinators
       */
    }>
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, infer E, any> ? E : never
    }[keyof Cases],
    In,
    | A
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, any, infer A> ? A : never
    }[keyof Cases]
  >
  <
    R,
    E extends { _tag: string },
    In,
    A,
    Cases extends { [K in E["_tag"]]+?: ((error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>) | undefined }
  >(
    self: HttpApp<R, E, In, A>,
    cases: Cases
  ): HttpApp<
    | R
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<infer R, any, any> ? R : never
    }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, infer E, any> ? E : never
    }[keyof Cases],
    In,
    | A
    | {
      [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, any, infer A> ? A : never
    }[keyof Cases]
  >
} = internal.catchTags

/**
 * @since 1.0.0
 * @category error handling
 */
export const catchAll: {
  <E, In, InX extends In, R2, E2, A2>(
    f: (e: E, request: InX) => Effect.Effect<R2, E2, A2>
  ): <R, In, A>(self: HttpApp<R, E, In, A>) => HttpApp<R2 | R, E2, In, A2 | A>
  <R, E, In, A, InX extends In, R2, E2, A2>(
    self: HttpApp<R, E, In, A>,
    f: (e: E, request: InX) => Effect.Effect<R2, E2, A2>
  ): HttpApp<R | R2, E2, In, A | A2>
} = internal.catchAll

/**
 * @since 1.0.0
 * @category combinators
 */
export const compose: {
  <R2, E2, Out, InX extends Out, Out2>(
    that: HttpApp<R2, E2, InX, Out2>
  ): <R, E, In>(self: HttpApp<R, E, In, Out>) => HttpApp<R2 | R, E2 | E, In, Out2>
  <R, E, In, Out, R2, E2, InX extends Out, Out2>(
    self: HttpApp<R, E, In, Out>,
    that: HttpApp<R2, E2, InX, Out2>
  ): HttpApp<R | R2, E | E2, In, Out2>
} = internal.compose

/**
 * @since 1.0.0
 * @category combinators
 */
export const composeInput: {
  <R2, E2, In2, In extends In2, Out2>(
    that: HttpApp<R2, E2, In2, Out2>
  ): <R, E, Out>(self: HttpApp<R, E, In, Out>) => HttpApp<R2 | R, E2 | E, In2, Out>
  <R, E, In2, In extends In2, Out, R2, E2, Out2>(
    self: HttpApp<R, E, In, Out>,
    that: HttpApp<R2, E2, In2, Out2>
  ): HttpApp<R | R2, E | E2, In2, Out>
} = internal.composeInput
