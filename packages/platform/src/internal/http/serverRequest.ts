import * as Context from "@effect/data/Context"
import { pipe } from "@effect/data/Function"
import * as Predicate from "@effect/data/Predicate"
import * as ReadonlyArray from "@effect/data/ReadonlyArray"
import * as Effect from "@effect/io/Effect"
import * as IncomingMessage from "@effect/platform/Http/IncomingMessage"
import * as Error from "@effect/platform/Http/ServerError"
import type * as ServerRequest from "@effect/platform/Http/ServerRequest"
import * as Schema from "@effect/schema/Schema"

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

/** @internal */
export const schemaFormDataJson = <I, A>(schema: Schema.Schema<I, A>) => {
  const parse = Schema.parse(schema)
  return (field: string) =>
    pipe(
      Effect.Do,
      Effect.bind("request", () => serverRequestTag),
      Effect.bind("formData", ({ request }) => request.formData),
      Effect.let("field", ({ formData }) => formData.get(field)),
      Effect.filterOrFail(
        ({ field }) => Predicate.isString(field),
        ({ request }) =>
          Error.RequestError({ request, reason: "Decode", error: "schemaFormDataJson: field was not a string" })
      ),
      Effect.flatMap(({ field, request }) =>
        Effect.flatMap(
          Effect.try({
            try: () => JSON.parse(field as string),
            catch: (error) =>
              Error.RequestError({
                request,
                reason: "Decode",
                error: `schemaFormDataJson: field was not valid json: ${error}`
              })
          }),
          parse
        )
      )
    )
}

/** @internal */
export const schemaFormDataFields = <I extends Readonly<Record<string, string>>, A>(schema: Schema.Schema<I, A>) => {
  const parse = Schema.parse(schema)
  return Effect.flatMap(
    Effect.flatMap(serverRequestTag, (request) => request.formData),
    (formData) =>
      parse(
        ReadonlyArray.filter(
          formData.entries(),
          (entry): entry is [string, string] => Predicate.isString(entry[1])
        )
      )
  )
}
