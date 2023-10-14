import * as Worker from "@effect/platform-node/Worker"
import { Console, Effect, Stream } from "effect"
import * as WT from "node:worker_threads"

if (WT.isMainThread) {
  Effect.gen(function*(_) {
    const pool = yield* _(Worker.makePool<number, never, number>({
      spawn: () => new WT.Worker(__filename),
      size: 2
    }))
    yield* _(
      Effect.scoped(pool.get()),
      Effect.flatMap((_) =>
        _.execute(1).pipe(
          Stream.runForEach(Console.log)
        )
      )
    )
  }).pipe(Effect.scoped, Effect.runPromise)
} else {
  Worker.makeRunner((n: number) => Stream.range(0, n)).pipe(
    Effect.scoped,
    Effect.runPromise
  )
}
