import { dual } from "@effect/data/Function"
import { pipeArguments } from "@effect/data/Pipeable"
import * as Effect from "@effect/io/Effect"
import type * as App from "@effect/platform/Http/App"

const httpAppProto = {
  pipe() {
    return pipeArguments(this, arguments)
  }
}

const setProto = <R, E, In, Out>(
  f: (req: In) => Effect.Effect<R, E, Out>
): App.HttpApp<R, E, In, Out> => {
  Object.setPrototypeOf(f, httpAppProto)
  return f as any
}

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
    setProto((request) => Effect.catchTag(self(request), tag, (e) => f(e, request as InX)))
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
  > => setProto((request) => Effect.catchTags(self(request), cases))
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
    setProto((request) => Effect.catchAll(self(request), (e) => f(e, request as InX)))
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
  setProto((req) =>
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
  setProto((req) =>
    Effect.flatMap(
      that(req),
      (out) => self(out as any)
    )
  ))
