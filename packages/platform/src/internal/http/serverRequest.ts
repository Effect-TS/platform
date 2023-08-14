import * as Context from "@effect/data/Context"
import * as Effect from "@effect/io/Effect"
import * as IncomingMessage from "@effect/platform/Http/IncomingMessage"
import type * as ServerRequest from "@effect/platform/Http/ServerRequest"
import type * as Schema from "@effect/schema/Schema"

/** @internal */
export const TypeId: ServerRequest.TypeId = Symbol.for("@effect/platform/Http/ServerRequest") as ServerRequest.TypeId

/** @internal */
export const serverRequestTag = Context.Tag<ServerRequest.ServerRequest>(TypeId)

/** @internal */
export const schemaHeaders = <I extends Readonly<Record<string, string>>, A>(schema: Schema.Schema<I, A>) => {
  const parse = IncomingMessage.schemaHeaders(schema)
  return Effect.flatMap(serverRequestTag, parse)
}

/** @internal */
export const schemaBodyJson = <I, A>(schema: Schema.Schema<I, A>) => {
  const parse = IncomingMessage.schemaBodyJson(schema)
  return Effect.flatMap(serverRequestTag, parse)
}

/** @internal */
export const schemaBodyUrlParams = <I extends Readonly<Record<string, string>>, A>(schema: Schema.Schema<I, A>) => {
  const parse = IncomingMessage.schemaBodyUrlParams(schema)
  return Effect.flatMap(serverRequestTag, parse)
}
