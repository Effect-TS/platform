import * as Cause from "effect/Cause"
import * as Context from "effect/Context"
import * as Deferred from "effect/Deferred"
import * as Effect from "effect/Effect"
import * as Exit from "effect/Exit"
import * as Fiber from "effect/Fiber"
import { pipe } from "effect/Function"
import * as Layer from "effect/Layer"
import * as Pool from "effect/Pool"
import * as Queue from "effect/Queue"
import * as Stream from "effect/Stream"
import type * as Worker from "../Worker"
import type { WorkerError } from "../WorkerError"

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
                    return response.length === 2 ?
                      Queue.shutdown(queue[0]) :
                      Effect.zipRight(
                        Queue.offer(queue[0], Exit.succeed(response[2])),
                        Queue.shutdown(queue[0])
                      )
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
                  backing.send([id, 0, request], transferables),
                  Deferred.await(result[1])
                )
              })
            ),
            Effect.ensuring(semaphore.release(1)),
            Effect.forever
          )
        )

        const executeAcquire = (request: I) =>
          Effect.tap(
            Effect.all([
              Effect.sync(() => requestIdCounter++),
              Queue.unbounded<Exit.Exit<E, O>>(),
              Deferred.make<never, void>()
            ]),
            ([id, queue, deferred]) =>
              Effect.suspend(() => {
                requestMap.set(id, [queue, deferred])
                return outbound.offer(id, request)
              })
          )

        const executeRelease = (
          [id, , deferred]: [number, Queue.Queue<Exit.Exit<E, O>>, Deferred.Deferred<never, void>],
          exit: Exit.Exit<unknown, unknown>
        ) => {
          const release = Effect.zipRight(
            Deferred.complete(deferred, Effect.unit),
            Effect.sync(() => requestMap.delete(id))
          )
          return Exit.isInterrupted(exit) ?
            Effect.zipRight(
              backing.send([id, 1]),
              release
            ) :
            release
        }

        const execute = (request: I) =>
          Stream.flatMap(
            Stream.acquireRelease(
              executeAcquire(request),
              executeRelease
            ),
            ([, queue]) => Stream.flatten(Stream.fromQueue(queue))
          )

        const executeEffect = (request: I) =>
          Effect.acquireUseRelease(
            executeAcquire(request),
            ([, queue]) => Effect.flatten(Queue.take(queue)),
            executeRelease
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
          ], { concurrency: "unbounded", discard: true }) as Effect.Effect<never, WorkerError, never>,
          Effect.forkScoped
        )

        return { id, fiber, execute, executeEffect }
      })
    }
  })
})

/** @internal */
export const layerManager = Layer.effect(WorkerManager, makeManager)

/** @internal */
export const makePool = <W>() =>
<I, E, O>(
  options: Worker.WorkerPool.Options<I, W>
) =>
  Effect.gen(function*(_) {
    const manager = yield* _(WorkerManager)
    const backing = yield* _(
      "timeToLive" in options ?
        Pool.makeWithTTL({
          acquire: manager.spawn<I, E, O>(options),
          min: options.minSize,
          max: options.maxSize,
          timeToLive: options.timeToLive
        }) :
        Pool.make({
          acquire: manager.spawn<I, E, O>(options),
          size: options.size
        })
    )
    const pool: Worker.WorkerPool<I, E, O> = {
      backing,
      execute: (message: I) =>
        Stream.unwrap(
          Effect.map(
            Effect.scoped(backing.get()),
            (worker) => worker.execute(message)
          )
        ),
      executeEffect: (message: I) =>
        Effect.flatMap(
          Effect.scoped(backing.get()),
          (worker) => worker.executeEffect(message)
        )
    }

    return pool
  })
