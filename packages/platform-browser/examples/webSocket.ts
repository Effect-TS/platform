/**
 * @since 1.0.0
 */

import * as WS from "@effect/platform-browser/WebSocket"
import * as Effect from "effect/Effect"

const program = Effect.gen(function*(_) {
  const ws = yield* _(WS.Socket)
  yield* _(ws.send("abc"))
}).pipe(Effect.provide(WS.layer("")), Effect.scoped, Effect.tapError((err) => Effect.logError(err)))

Effect.runFork(program)
