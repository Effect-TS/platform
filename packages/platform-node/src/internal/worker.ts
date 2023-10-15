import * as Worker from "@effect/platform/Worker"
import { WorkerError } from "@effect/platform/WorkerError"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Queue from "effect/Queue"
import type * as WorkerThreads from "node:worker_threads"

const platformWorkerImpl = Worker.PlatformWorker.of({
  [Worker.PlatformWorkerTypeId]: Worker.PlatformWorkerTypeId,
  spawn<I, O>(worker_: unknown) {
    return Effect.gen(function*(_) {
      const worker = worker_ as WorkerThreads.Worker
      yield* _(Effect.addFinalizer(() => Effect.sync(() => worker.postMessage([1]))))
      const queue = yield* _(Queue.unbounded<Worker.BackingWorker.Message<O>>())
      const fiber = yield* _(
        Effect.async<never, WorkerError, never>((resume) => {
          worker.on("message", (message: Worker.BackingWorker.Message<O>) => {
            queue.unsafeOffer(message)
          })
          worker.on("messageerror", (error) => {
            resume(Effect.fail(WorkerError("decode", error)))
          })
          worker.on("error", (error) => {
            resume(Effect.fail(WorkerError("unknown", error)))
          })
          return Effect.sync(() => {
            worker.removeAllListeners()
          })
        }),
        Effect.forkScoped
      )
      const send = (message: I, transfers?: ReadonlyArray<unknown>) =>
        Effect.sync(() => worker.postMessage([0, message], transfers as any))
      return { fiber, queue, send }
    })
  }
})

/** @internal */
export const layerWorker = Layer.succeed(Worker.PlatformWorker, platformWorkerImpl)

/** @internal */
export const layerManager = Layer.provide(layerWorker, Worker.layerManager)

/** @internal */
export const makePool = <I, E, O>(options: Worker.WorkerPool.Options<I, WorkerThreads.Worker>) =>
  Effect.provide(
    Worker.makePool<WorkerThreads.Worker>()<I, E, O>(options),
    layerManager
  )
