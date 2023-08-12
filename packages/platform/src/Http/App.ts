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
 * @category type ids
 */
export const TypeId: unique symbol = internal.TypeId

/**
 * @since 1.0.0
 * @category type ids
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface HttpApp<R, E, In, Out> extends Pipeable {
  readonly [TypeId]: TypeId
  (request: In): Effect.Effect<R, E, Out>
}

/**
 * @since 1.0.0
 */
export namespace HttpApp {
  /**
   * @since 1.0.0
   */
  export type Context<A> = A extends HttpApp<infer R, infer _E, infer _In, infer _Out> ? R : never

  /**
   * @since 1.0.0
   */
  export type Error<A> = A extends HttpApp<infer _R, infer E, infer _In, infer _Out> ? E : never
}

/**
 * @since 1.0.0
 * @category models
 */
export type Default<R, E> = HttpApp<R, E, ServerRequest.ServerRequest, ServerResponse.ServerResponse>

/**
 * @since 1.0.0
 * @category refinements
 */
export const isHttpApp: (u: unknown) => u is HttpApp<unknown, unknown, unknown, unknown> = internal.isHttpApp

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: <R, E, In, Out>(f: (req: In) => Effect.Effect<R, E, Out>) => HttpApp<R, E, In, Out> = internal.make

/**
 * @since 1.0.0
 * @category constructors
 */
export const makeDefault: <R, E>(
  f: (request: ServerRequest.ServerRequest) => Effect.Effect<R, E, ServerResponse.ServerResponse>
) => Default<R, E> = internal.makeDefault

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
export const map: {
  <A, In, B>(f: (a: A, request: In) => B): <R, E>(self: HttpApp<R, E, In, A>) => HttpApp<R, E, In, B>
  <R, E, In, A, B>(self: HttpApp<R, E, In, A>, f: (a: A, request: In) => B): HttpApp<R, E, In, B>
} = internal.map

/**
 * @since 1.0.0
 * @category combinators
 */
export const mapEffect: {
  <A, In, R2, E1, B>(
    f: (a: A, request: In) => Effect.Effect<R2, E1, B>
  ): <R, E>(self: HttpApp<R, E, In, A>) => HttpApp<R2 | R, E1 | E, In, B>
  <R, E, In, A, R2, E1, B>(
    self: HttpApp<R, E, In, A>,
    f: (a: A, request: In) => Effect.Effect<R2, E1, B>
  ): HttpApp<R | R2, E | E1, In, B>
} = internal.mapEffect

/**
 * @since 1.0.0
 * @category combinators
 */
export const mapRequest: {
  <In, In2>(f: (request: In2) => In): <R, E, A>(self: HttpApp<R, E, In, A>) => HttpApp<R, E, In2, A>
  <R, E, In, A, In2>(self: HttpApp<R, E, In, A>, f: (request: In2) => In): HttpApp<R, E, In2, A>
} = internal.mapRequest

/**
 * @since 1.0.0
 * @category combinators
 */
export const mapRequestEffect: {
  <In2, R2, E1, In>(
    f: (request: In2) => Effect.Effect<R2, E1, In>
  ): <R, E, A>(self: HttpApp<R, E, In, A>) => HttpApp<R2 | R, E1 | E, In2, A>
  <R, E, In, A, In2, R2, E1>(
    self: HttpApp<R, E, In, A>,
    f: (request: In2) => Effect.Effect<R2, E1, In>
  ): HttpApp<R | R2, E | E1, In2, A>
} = internal.mapRequestEffect

/**
 * @since 1.0.0
 * @category combinators
 */
export const tap: {
  <A, In, R2, E1, _>(
    f: (a: A, request: In) => Effect.Effect<R2, E1, _>
  ): <R, E>(self: HttpApp<R, E, In, A>) => HttpApp<R2 | R, E1 | E, In, A>
  <R, E, In, A, R2, E1, _>(
    self: HttpApp<R, E, In, A>,
    f: (a: A, request: In) => Effect.Effect<R2, E1, _>
  ): HttpApp<R | R2, E | E1, In, A>
} = internal.tap

/**
 * @since 1.0.0
 * @category combinators
 */
export const tapRequest: {
  <In, R2, E1, _>(
    f: (request: In) => Effect.Effect<R2, E1, _>
  ): <R, E, A>(self: HttpApp<R, E, In, A>) => HttpApp<R2 | R, E1 | E, In, A>
  <R, E, In, A, R2, E1, _>(
    self: HttpApp<R, E, In, A>,
    f: (request: In) => Effect.Effect<R2, E1, _>
  ): HttpApp<R | R2, E | E1, In, A>
} = internal.tapRequest
