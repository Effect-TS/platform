import * as Cause from "effect/Cause"
import * as Context from "effect/Context"
import * as Data from "effect/Data"
import * as Deferred from "effect/Deferred"
import * as Effect from "effect/Effect"
import * as Either from "effect/Either"
import * as Exit from "effect/Exit"
import * as Fiber from "effect/Fiber"
import { pipe } from "effect/Function"
import * as Layer from "effect/Layer"
import * as Pool from "effect/Pool"
import * as Queue from "effect/Queue"
import * as Stream from "effect/Stream"
import type * as Worker from "../Worker"

/** @internal */
export const WorkerErrorTypeId: Worker.WorkerErrorTypeId = Symbol.for(
  "@effect-ts/platform/Worker/WorkerError"
) as Worker.WorkerErrorTypeId

/** @internal */
export const WorkerError = (reason: Worker.WorkerError["reason"], error: unknown): Worker.WorkerError =>
  Data.struct({
    [WorkerErrorTypeId]: WorkerErrorTypeId,
    _tag: "WorkerError",
    reason,
    error
  })

/** @internal */
export const defaultQueue = <I>() =>
  Effect.map(
    Queue.unbounded<readonly [id: number, item: I]>(),
    (queue): Worker.WorkerQueue<I> => ({
      offer: (id, item) => Queue.offer(queue, [id, item]),
      take: Queue.take(queue)
    })
  )

/** @internal */
export const PlatformWorkerTypeId: Worker.PlatformWorkerTypeId = Symbol.for(
  "@effect/platform/Worker/PlatformWorker"
) as Worker.PlatformWorkerTypeId

/** @internal */
export const PlatformWorker = Context.Tag<Worker.PlatformWorker>(
  PlatformWorkerTypeId
)

/** @internal */
export const PlatformRunnerTypeId: Worker.PlatformRunnerTypeId = Symbol.for(
  "@effect/platform/Runner/PlatformRunner"
) as Worker.PlatformRunnerTypeId

/** @internal */
export const PlatformRunner = Context.Tag<Worker.PlatformRunner>(
  PlatformRunnerTypeId
)

/** @internal */
export const WorkerManagerTypeId: Worker.WorkerManagerTypeId = Symbol.for(
  "@effect/platform/Worker/WorkerManager"
) as Worker.WorkerManagerTypeId

/** @internal */
export const WorkerManager = Context.Tag<Worker.WorkerManager>(
  WorkerManagerTypeId
)

/** @internal */
export const makeManager = Effect.gen(function*(_) {
  const platform = yield* _(PlatformWorker)
  let idCounter = 0
  return WorkerManager.of({
    [WorkerManagerTypeId]: WorkerManagerTypeId,
    spawn<I, E, O>({ permits = 1, queue, spawn, transfers = (_) => [] }: Worker.Worker.Options<I>) {
      return Effect.gen(function*(_) {
        const id = idCounter++
        let requestIdCounter = 0
        const readyLatch = yield* _(Deferred.make<never, void>())
        const outbound = queue ?? (yield* _(defaultQueue<I>()))
        const semaphore = yield* _(Effect.makeSemaphore(permits))
        const requestMap = new Map<number, readonly [Queue.Queue<Exit.Exit<E, O>>, Deferred.Deferred<never, void>]>()

        const backing = yield* _(
          platform.spawn<Worker.Worker.Request<I>, Worker.Worker.Response<E, O>>(spawn(id))
        )

        const handleExit = (exit: Exit.Exit<E, never>) =>
          Effect.zipRight(
            Effect.forEach(requestMap.values(), ([queue]) => Queue.offer(queue, exit), { discard: true }),
            Effect.sync(() => requestMap.clear())
          )

        yield* _(Effect.addFinalizer(() => handleExit(Exit.failCause(Cause.empty))))

        const handleMessage = (msg: Worker.BackingWorker.Message<Worker.Worker.Response<E, O>>) =>
          Effect.suspend(() => {
            switch (msg[0]) {
              case 0: {
                return Deferred.complete(readyLatch, Effect.unit)
              }
              case 1: {
                const response = msg[1]
                const queue = requestMap.get(response[0])
                if (!queue) return Effect.unit

                switch (response[1]) {
                  // data
                  case 0: {
                    return Queue.offer(queue[0], Exit.succeed(response[2]))
                  }
                  // end
                  case 1: {
                    return Queue.shutdown(queue[0])
                  }
                  // error / defect
                  case 2:
                  case 3: {
                    return Effect.zipRight(
                      Queue.offer(
                        queue[0],
                        response[1] === 2
                          ? Exit.fail(response[2])
                          : Exit.die(response[2])
                      ),
                      Queue.shutdown(queue[0])
                    )
                  }
                }
              }
            }
          })

        const postMessages = Effect.zipRight(
          Deferred.await(readyLatch),
          pipe(
            semaphore.take(1),
            Effect.zipRight(outbound.take),
            Effect.flatMap(([id, request]) =>
              Effect.suspend(() => {
                const result = requestMap.get(id)
                if (!result) return Effect.unit
                const transferables = transfers(request)
                return Effect.zipRight(
                  backing.send([id, request], transferables),
                  Deferred.await(result[1])
                )
              })
            ),
            Effect.ensuring(semaphore.release(1)),
            Effect.forever
          )
        )

        const execute = (request: I) =>
          Stream.flatMap(
            Stream.acquireRelease(
              Effect.tap(
                Effect.all([
                  Effect.sync(() => requestIdCounter++),
                  Queue.unbounded<Exit.Exit<E, O>>(),
                  Deferred.make<never, void>()
                ]),
                ([id, queue, deferred]) => Effect.sync(() => requestMap.set(id, [queue, deferred]))
              ),
              ([id, , deferred]) =>
                Effect.zipRight(
                  Deferred.complete(deferred, Effect.unit),
                  Effect.sync(() => requestMap.delete(id))
                )
            ),
            ([id, queue]) =>
              Stream.unwrap(
                Effect.as(
                  outbound.offer(id, request),
                  Stream.flatten(Stream.fromQueue(queue))
                )
              )
          )

        const handleMessages = pipe(
          Queue.take(backing.queue),
          Effect.flatMap(handleMessage),
          Effect.forever
        )

        const fiber = yield* _(
          Effect.all([
            handleMessages,
            postMessages,
            Fiber.join(backing.fiber)
          ], { concurrency: "unbounded", discard: true }) as Effect.Effect<never, Worker.WorkerError, never>,
          Effect.forkScoped
        )

        return { id, fiber, execute }
      })
    }
  })
})

/** @internal */
export const layerManager = Layer.effect(WorkerManager, makeManager)

/** @internal */
export const makeRunner = <I, R, E, O>(
  process: (request: I) => Stream.Stream<R, E, O>,
  options?: Worker.Runner.Options<O>
) =>
  Effect.gen(function*(_) {
    const platform = yield* _(PlatformRunner)
    const backing = yield* _(platform.start<Worker.Worker.Request<I>, Worker.Worker.Response<E, O>>())

    const handleRequests = pipe(
      Queue.take(backing.queue),
      Effect.tap(([id, data]) =>
        pipe(
          process(data),
          Stream.tap((item) => backing.send([id, 0, item], options?.transfers ? options.transfers(item) : undefined)),
          Stream.runDrain,
          Effect.matchCauseEffect({
            onFailure: (cause) =>
              Either.match(Cause.failureOrCause(cause), {
                onLeft: (error) => backing.send([id, 2, error]),
                onRight: (cause) => backing.send([id, 3, Cause.squash(cause)])
              }),
            onSuccess: () => backing.send([id, 1])
          })
        )
      ),
      Effect.forever
    )

    return yield* _(
      Effect.all([
        handleRequests,
        Fiber.join(backing.fiber)
      ], { concurrency: "unbounded", discard: true })
    )
  })

/** @internal */
export const makePool = <W>() =>
<I, E, O>(
  options: Worker.Worker.PoolOptions<I, W>
) =>
  Effect.flatMap(
    WorkerManager,
    (manager) =>
      Pool.makeWithTTL({
        acquire: manager.spawn<I, E, O>(options),
        min: options.minSize ?? options.size,
        max: options.size,
        timeToLive: options.timeToLive ?? "30 minutes"
      })
  )
