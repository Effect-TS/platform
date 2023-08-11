import { dual } from "@effect/data/Function"
import { pipeArguments } from "@effect/data/Pipeable"
import * as Effect from "@effect/io/Effect"
import type * as App from "@effect/platform/Http/App"
import type * as ServerRequest from "@effect/platform/Http/ServerRequest"
import type * as ServerResponse from "@effect/platform/Http/ServerResponse"

/** @internal */
export const TypeId: App.TypeId = Symbol.for("@effect/platform/Http/App") as App.TypeId

const httpAppProto = {
  [TypeId]: TypeId,
  pipe() {
    return pipeArguments(this, arguments)
  }
}

/** @internal */
export const isHttpApp = (u: unknown): u is App.HttpApp<unknown, unknown, unknown, unknown> =>
  typeof u === "function" && TypeId in u

/** @internal */
export const make = <R, E, In, Out>(
  f: (req: In) => Effect.Effect<R, E, Out>
): App.HttpApp<R, E, In, Out> => {
  Object.setPrototypeOf(f, httpAppProto)
  return f as any
}

/** @internal */
export const makeDefault: <R, E>(
  f: (request: ServerRequest.ServerRequest) => Effect.Effect<R, E, ServerResponse.ServerResponse>
) => App.Default<R, E> = make

/** @internal */
export const catchTag: {
  <E extends { _tag: string }, K extends E["_tag"] & string, In, InX extends In, R1, E1, A1>(
    tag: K,
    f: (e: Extract<E, { _tag: K }>, request: InX) => Effect.Effect<R1, E1, A1>
  ): <R, A>(
    self: App.HttpApp<R, E, In, A>
  ) => App.HttpApp<R1 | R, E1 | Exclude<E, { _tag: K }>, In, A1 | A>
  <R, E extends { _tag: string }, In, A, K extends E["_tag"] & string, InX extends In, E1, R1, A1>(
    self: App.HttpApp<R, E, In, A>,
    tag: K,
    f: (e: Extract<E, { _tag: K }>, request: InX) => Effect.Effect<R1, E1, A1>
  ): App.HttpApp<R1 | R, E1 | Exclude<E, { _tag: K }>, In, A1 | A>
} = dual(
  3,
  <R, E extends { _tag: string }, In, A, K extends E["_tag"] & string, InX extends In, E1, R1, A1>(
    self: App.HttpApp<R, E, In, A>,
    tag: K,
    f: (e: Extract<E, { _tag: K }>, request: InX) => Effect.Effect<R1, E1, A1>
  ): App.HttpApp<R1 | R, E1 | Exclude<E, { _tag: K }>, In, A1 | A> =>
    make((request) => Effect.catchTag(self(request), tag, (e) => f(e, request as InX)))
)

/** @internal */
export const catchTags: {
  <
    E extends { _tag: string },
    Cases extends {
      [K in E["_tag"]]+?:
        | ((error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>)
        | undefined
    }
  >(
    cases: Cases
  ): <R, In, A>(
    self: App.HttpApp<R, E, In, A>
  ) => App.HttpApp<
    | R
    | {
      [K in keyof Cases]: Cases[K] extends (
        ...args: Array<any>
      ) => Effect.Effect<infer R, any, any> ? R
        : never
    }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
      [K in keyof Cases]: Cases[K] extends (
        ...args: Array<any>
      ) => Effect.Effect<any, infer E, any> ? E
        : never
    }[keyof Cases],
    In,
    | A
    | {
      [K in keyof Cases]: Cases[K] extends (
        ...args: Array<any>
      ) => Effect.Effect<any, any, infer A> ? A
        : never
    }[keyof Cases]
  >
  <
    R,
    E extends { _tag: string },
    In,
    A,
    Cases extends {
      [K in E["_tag"]]+?:
        | ((error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>)
        | undefined
    }
  >(
    self: App.HttpApp<R, E, In, A>,
    cases: Cases
  ): App.HttpApp<
    | R
    | {
      [K in keyof Cases]: Cases[K] extends (
        ...args: Array<any>
      ) => Effect.Effect<infer R, any, any> ? R
        : never
    }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
      [K in keyof Cases]: Cases[K] extends (
        ...args: Array<any>
      ) => Effect.Effect<any, infer E, any> ? E
        : never
    }[keyof Cases],
    In,
    | A
    | {
      [K in keyof Cases]: Cases[K] extends (
        ...args: Array<any>
      ) => Effect.Effect<any, any, infer A> ? A
        : never
    }[keyof Cases]
  >
} = dual(
  2,
  <
    R,
    E extends { _tag: string },
    In,
    A,
    Cases extends {
      [K in E["_tag"]]+?:
        | ((error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>)
        | undefined
    }
  >(
    self: App.HttpApp<R, E, In, A>,
    cases: Cases
  ): App.HttpApp<
    | R
    | {
      [K in keyof Cases]: Cases[K] extends (
        ...args: Array<any>
      ) => Effect.Effect<infer R, any, any> ? R
        : never
    }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
      [K in keyof Cases]: Cases[K] extends (
        ...args: Array<any>
      ) => Effect.Effect<any, infer E, any> ? E
        : never
    }[keyof Cases],
    In,
    | A
    | {
      [K in keyof Cases]: Cases[K] extends (
        ...args: Array<any>
      ) => Effect.Effect<any, any, infer A> ? A
        : never
    }[keyof Cases]
  > => make((request) => Effect.catchTags(self(request), cases))
)

/** @internal */
export const catchAll: {
  <E, In, InX extends In, R2, E2, A2>(f: (e: E, request: InX) => Effect.Effect<R2, E2, A2>): <R, In, A>(
    self: App.HttpApp<R, E, In, A>
  ) => App.HttpApp<R | R2, E2, In, A2 | A>
  <R, E, In, A, InX extends In, R2, E2, A2>(
    self: App.HttpApp<R, E, In, A>,
    f: (e: E, request: InX) => Effect.Effect<R2, E2, A2>
  ): App.HttpApp<R | R2, E2, In, A2 | A>
} = dual(
  2,
  <R, E, In, A, InX extends In, R2, E2, A2>(
    self: App.HttpApp<R, E, In, A>,
    f: (e: E, request: InX) => Effect.Effect<R2, E2, A2>
  ): App.HttpApp<R | R2, E2, In, A2 | A> =>
    make((request) => Effect.catchAll(self(request), (e) => f(e, request as InX)))
)

/** @internal */
export const compose = dual<
  <R2, E2, Out, InX extends Out, Out2>(that: App.HttpApp<R2, E2, InX, Out2>) => <R, E, In>(
    self: App.HttpApp<R, E, In, Out>
  ) => App.HttpApp<R | R2, E | E2, In, Out2>,
  <R, E, In, Out, R2, E2, InX extends Out, Out2>(
    self: App.HttpApp<R, E, In, Out>,
    that: App.HttpApp<R2, E2, InX, Out2>
  ) => App.HttpApp<R | R2, E | E2, In, Out2>
>(2, (self, that) =>
  make((req) =>
    Effect.flatMap(
      self(req),
      (out) => that(out as any)
    )
  ))

/** @internal */
export const composeInput = dual<
  <R2, E2, In2, In extends In2, Out2>(that: App.HttpApp<R2, E2, In2, Out2>) => <R, E, Out>(
    self: App.HttpApp<R, E, In, Out>
  ) => App.HttpApp<R | R2, E | E2, In2, Out>,
  <R, E, In2, In extends In2, Out, R2, E2, Out2>(
    self: App.HttpApp<R, E, In, Out>,
    that: App.HttpApp<R2, E2, In2, Out2>
  ) => App.HttpApp<R | R2, E | E2, In2, Out>
>(2, (self, that) =>
  make((req) =>
    Effect.flatMap(
      that(req),
      (out) => self(out as any)
    )
  ))

/** @internal */
export const map = dual<
  <A, In, B>(f: (a: A, request: In) => B) => <R, E>(
    self: App.HttpApp<R, E, In, A>
  ) => App.HttpApp<R, E, In, B>,
  <R, E, In, A, B>(
    self: App.HttpApp<R, E, In, A>,
    f: (a: A, request: In) => B
  ) => App.HttpApp<R, E, In, B>
>(2, (self, f) =>
  make((req) =>
    Effect.map(
      self(req),
      (a) => f(a, req)
    )
  ))

/** @internal */
export const mapEffect = dual<
  <A, In, R2, E1, B>(f: (a: A, request: In) => Effect.Effect<R2, E1, B>) => <R, E>(
    self: App.HttpApp<R, E, In, A>
  ) => App.HttpApp<R | R2, E | E1, In, B>,
  <R, E, In, A, R2, E1, B>(
    self: App.HttpApp<R, E, In, A>,
    f: (a: A, request: In) => Effect.Effect<R2, E1, B>
  ) => App.HttpApp<R | R2, E | E1, In, B>
>(2, (self, f) =>
  make((req) =>
    Effect.flatMap(
      self(req),
      (a) => f(a, req)
    )
  ))

/** @internal */
export const mapRequest = dual<
  <In, In2>(f: (request: In2) => In) => <R, E, A>(
    self: App.HttpApp<R, E, In, A>
  ) => App.HttpApp<R, E, In2, A>,
  <R, E, In, A, In2>(
    self: App.HttpApp<R, E, In, A>,
    f: (request: In2) => In
  ) => App.HttpApp<R, E, In2, A>
>(2, (self, f) => make((req) => self(f(req))))

/** @internal */
export const mapRequestEffect = dual<
  <In2, R2, E1, In>(f: (request: In2) => Effect.Effect<R2, E1, In>) => <R, E, A>(
    self: App.HttpApp<R, E, In, A>
  ) => App.HttpApp<R | R2, E | E1, In2, A>,
  <R, E, In, A, In2, R2, E1>(
    self: App.HttpApp<R, E, In, A>,
    f: (request: In2) => Effect.Effect<R2, E1, In>
  ) => App.HttpApp<R | R2, E | E1, In2, A>
>(2, (self, f) => make((req) => Effect.flatMap(f(req), self)))

/** @internal */
export const tap = dual<
  <A, In, R2, E1, _>(f: (a: A, request: In) => Effect.Effect<R2, E1, _>) => <R, E>(
    self: App.HttpApp<R, E, In, A>
  ) => App.HttpApp<R | R2, E | E1, In, A>,
  <R, E, In, A, R2, E1, _>(
    self: App.HttpApp<R, E, In, A>,
    f: (a: A, request: In) => Effect.Effect<R2, E1, _>
  ) => App.HttpApp<R | R2, E | E1, In, A>
>(2, (self, f) =>
  make((req) =>
    Effect.tap(
      self(req),
      (a) => f(a, req)
    )
  ))

/** @internal */
export const tapRequest = dual<
  <In, R2, E1, _>(f: (request: In) => Effect.Effect<R2, E1, _>) => <R, E, A>(
    self: App.HttpApp<R, E, In, A>
  ) => App.HttpApp<R | R2, E | E1, In, A>,
  <R, E, In, A, R2, E1, _>(
    self: App.HttpApp<R, E, In, A>,
    f: (request: In) => Effect.Effect<R2, E1, _>
  ) => App.HttpApp<R | R2, E | E1, In, A>
>(2, (self, f) => make((req) => Effect.zipRight(f(req), self(req))))
