import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Queue from "effect/Queue"
import type * as Worker from "../Worker"

/** @internal */
export const WorkerErrorTypeId: Worker.WorkerErrorTypeId = Symbol.for(
  "@effect-ts/platform/Worker/WorkerError"
) as Worker.WorkerErrorTypeId

/** @internal */
export const defaultQueue = <I>() =>
  Effect.map(
    Queue.unbounded<I>(),
    (queue): Worker.WorkerQueue<I> => ({
      offer: (_) => Queue.offer(queue, _),
      take: Queue.take(queue)
    })
  )

/** @internal */
export const PlatformBackingWorkerTypeId: Worker.PlatformBackingWorkerTypeId = Symbol.for(
  "@effect/platform/Worker/PlatformBackingWorker"
) as Worker.PlatformBackingWorkerTypeId

/** @internal */
export const PlatformBackingWorker = Context.Tag<Worker.PlatformBackingWorker>(
  PlatformBackingWorkerTypeId
)

/** @internal */
export const WorkerManagerTypeId: Worker.WorkerManagerTypeId = Symbol.for(
  "@effect/platform/Worker/WorkerManager"
) as Worker.WorkerManagerTypeId

/** @internal */
export const WorkerManager = Context.Tag<Worker.WorkerManager>(
  WorkerManagerTypeId
)
