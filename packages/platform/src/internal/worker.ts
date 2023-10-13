import * as Cause from "effect/Cause"
import * as Context from "effect/Context"
import * as Data from "effect/Data"
import * as Deferred from "effect/Deferred"
import * as Effect from "effect/Effect"
import * as Exit from "effect/Exit"
import * as Fiber from "effect/Fiber"
import { pipe } from "effect/Function"
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
export const BackingWorkerPlatformTypeId: Worker.BackingWorkerPlatformTypeId = Symbol.for(
  "@effect/platform/Worker/PlatformBackingWorker"
) as Worker.BackingWorkerPlatformTypeId

/** @internal */
export const BackingWorkerPlatform = Context.Tag<Worker.BackingWorkerPlatform>(
  BackingWorkerPlatformTypeId
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
  const platform = yield* _(BackingWorkerPlatform)
  let idCounter = 0
  return WorkerManager.of({
    [WorkerManagerTypeId]: WorkerManagerTypeId,
    spawn<I, E, O>({ permits = 1, queue, spawn, transfers = (_) => [] }: Worker.Worker.Options<I>) {
      return Effect.gen(function*(_) {
        let requestIdCounter = 0
        const readyLatch = yield* _(Deferred.make<never, void>())
        const outbound = queue ?? (yield* _(defaultQueue<I>()))
        const semaphore = yield* _(Effect.makeSemaphore(permits))
        const requestMap = new Map<number, readonly [Queue.Queue<Exit.Exit<E, O>>, Deferred.Deferred<never, void>]>()

        const backing = yield* _(
          platform.spawn<Worker.Worker.Request<I>, Worker.Worker.Response<E, O>>(spawn(idCounter++))
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
                  case 1: {
                    return Queue.offer(queue[0], Exit.succeed(response[2]))
                  }
                  // error
                  case 0:
                  // end
                  case 2: {
                    return Queue.offer(
                      queue[0],
                      response[1] === 0 ? Exit.fail(response[2]) : Exit.failCause(Cause.empty)
                    )
                  }
                }
              }
            }
          })

        const postMessages = pipe(
          Deferred.await(readyLatch),
          Effect.zipRight(semaphore.take(1)),
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

        const execute = (request: I) =>
          Stream.flatMap(
            Stream.acquireRelease(
              Effect.all([
                Effect.sync(() => requestIdCounter++),
                Queue.unbounded<Exit.Exit<E, O>>(),
                Deferred.make<never, void>()
              ]),
              ([id, queue, deferred]) =>
                Effect.zipRight(
                  Effect.zipRight(
                    Deferred.complete(deferred, Effect.unit),
                    Queue.shutdown(queue)
                  ),
                  Effect.sync(() => requestMap.delete(id))
                )
            ),
            ([id, queue, deferred]) =>
              Stream.suspend(() => {
                requestMap.set(id, [queue, deferred])
                return pipe(
                  outbound.offer(id, request),
                  Stream.zipRight(Stream.flatMap(
                    Stream.fromQueue(queue),
                    Exit.match({
                      onFailure: (cause) => Cause.isEmpty(cause) ? Stream.empty : Stream.failCause(cause),
                      onSuccess: Stream.succeed
                    })
                  ))
                )
              })
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

        return { fiber, execute }
      })
    }
  })
})
