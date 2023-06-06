import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import * as Console from "@effect/platform/Console"

/** @internal */
const consoleImpl = Console.Console.of({
  log(...args) {
    return Effect.sync(() => {
      console.log(...args)
    })
  },
  logError(...args) {
    return Effect.sync(() => {
      console.error(...args)
    })
  }
})

/** @internal */
export const layer = Layer.succeed(Console.Console, consoleImpl)
