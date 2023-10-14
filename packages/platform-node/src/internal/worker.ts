import * as Worker from "@effect/platform/Worker"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Queue from "effect/Queue"
import type * as Scope from "effect/Scope"
import type * as Stream from "effect/Stream"
import * as WorkerThreads from "node:worker_threads"

const platformWorkerImpl = Worker.PlatformWorker.of({
  [Worker.PlatformWorkerTypeId]: Worker.PlatformWorkerTypeId,
  spawn<I, O>(worker_: unknown) {
    return Effect.gen(function*(_) {
      const worker = worker_ as WorkerThreads.Worker
      yield* _(Effect.addFinalizer(() => Effect.sync(() => worker.postMessage([1]))))
      const queue = yield* _(Queue.unbounded<Worker.BackingWorker.Message<O>>())
      const fiber = yield* _(
        Effect.async<never, Worker.WorkerError, never>((resume) => {
          worker.on("message", (message: Worker.BackingWorker.Message<O>) => {
            queue.unsafeOffer(message)
          })
          worker.on("messageerror", (error) => {
            resume(Effect.fail(Worker.WorkerError("decode", error)))
          })
          worker.on("error", (error) => {
            resume(Effect.fail(Worker.WorkerError("unknown", error)))
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

const platformRunnerImpl = Worker.PlatformRunner.of({
  [Worker.PlatformRunnerTypeId]: Worker.PlatformRunnerTypeId,
  start<I, O>() {
    return Effect.gen(function*(_) {
      if (!WorkerThreads.parentPort) {
        return yield* _(Effect.fail(Worker.WorkerError("spawn", "not in worker")))
      }
      const port = WorkerThreads.parentPort
      yield* _(Effect.addFinalizer(() => Effect.sync(() => port.unref())))
      const queue = yield* _(Queue.unbounded<I>())
      const fiber = yield* _(
        Effect.async<never, Worker.WorkerError, never>((resume) => {
          port.on("message", (message: Worker.BackingRunner.Message<I>) => {
            if (message[0] === 0) {
              queue.unsafeOffer(message[1])
            } else {
              Effect.runFork(Queue.shutdown(queue))
            }
          })
          port.on("messageerror", (error) => {
            resume(Effect.fail(Worker.WorkerError("decode", error)))
          })
          port.on("error", (error) => {
            resume(Effect.fail(Worker.WorkerError("unknown", error)))
          })
          return Effect.sync(() => {
            port.removeAllListeners()
          })
        }),
        Effect.forkScoped
      )
      const send = (message: O, transfers?: ReadonlyArray<unknown>) =>
        Effect.sync(() => port.postMessage([1, message], transfers as any))
      // ready
      port.postMessage([0])
      return { fiber, queue, send }
    })
  }
})

/** @internal */
export const layerWorker = Layer.succeed(Worker.PlatformWorker, platformWorkerImpl)

/** @internal */
export const layerRunner = Layer.succeed(Worker.PlatformRunner, platformRunnerImpl)

/** @internal */
export const layerManager = Layer.provide(layerWorker, Worker.layerManager)

/** @internal */
export const makeRunner = <I, R, E, O>(
  process: (request: I) => Stream.Stream<R, E, O>,
  options?: Worker.Runner.Options<O>
): Effect.Effect<Scope.Scope | R, Worker.WorkerError, void> =>
  Effect.provide(Worker.makeRunner(process, options), layerRunner)

/** @internal */
export const makePool = <I, E, O>(options: Worker.Worker.PoolOptions<I, WorkerThreads.Worker>) =>
  Effect.provide(
    Worker.makePool<WorkerThreads.Worker>()<I, E, O>(options),
    layerManager
  )
