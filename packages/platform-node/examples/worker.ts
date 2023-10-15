import * as Worker from "@effect/platform-node/Worker"
import * as Runner from "@effect/platform-node/WorkerRunner"
import { Console, Effect, Stream } from "effect"
import * as WT from "node:worker_threads"

if (WT.isMainThread) {
  Effect.gen(function*(_) {
    const pool = yield* _(Worker.makePool<number, never, number>({
      spawn: () => new WT.Worker(__filename),
      size: 2
    }))
    yield* _(
      pool.execute(5).pipe(
        Stream.runForEach(Console.log)
      )
    )
  }).pipe(Effect.scoped, Effect.runPromise)
} else {
  Runner.make((n: number) => Stream.range(0, n)).pipe(
    Effect.scoped,
    Effect.runPromise
  )
}
