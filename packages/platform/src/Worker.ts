/**
 * @since 1.0.0
 */
import type { Effect } from "effect"
import type * as Context from "effect/Context"
import type * as Data from "effect/Data"
import type * as Queue from "effect/Queue"
import type * as Scope from "effect/Scope"
import type * as Stream from "effect/Stream"
import * as internal from "./internal/worker"

/**
 * @since 1.0.0
 * @category models
 */
export interface BackingWorker<I, O> {
  readonly send: (message: I, transfers?: ReadonlyArray<unknown>) => Effect.Effect<never, never, void>
  readonly queue: Queue.Dequeue<BackingWorker.Message<O>>
}

/**
 * @since 1.0.0
 * @category models
 */
export declare namespace BackingWorker {
  /**
   * @since 1.0.0
   * @category models
   */
  export type Message<O> = readonly [ready: 0] | readonly [error: 1, WorkerError] | readonly [message: 2, O]
}

/**
 * @since 1.0.0
 * @category type ids
 */
export const PlatformBackingWorkerTypeId: unique symbol = internal.PlatformBackingWorkerTypeId

/**
 * @since 1.0.0
 * @category type ids
 */
export type PlatformBackingWorkerTypeId = typeof PlatformBackingWorkerTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface PlatformBackingWorker {
  readonly [PlatformBackingWorkerTypeId]: PlatformBackingWorkerTypeId
  readonly spawn: <I, O>() => Effect.Effect<Scope.Scope, WorkerError, BackingWorker<I, O>>
}

/**
 * @since 1.0.0
 * @category tags
 */
export const PlatformBackingWorker: Context.Tag<PlatformBackingWorker, PlatformBackingWorker> =
  internal.PlatformBackingWorker

/**
 * @since 1.0.0
 * @category models
 */
export interface Worker<I, E, O> {
  readonly backing: BackingWorker<Worker.Request<I>, Worker.Response<E, O>>
  readonly execute: (message: I) => Stream.Stream<never, E, O>
}

/**
 * @since 1.0.0
 * @category models
 */
export declare namespace Worker {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Options<I, E, O> {
    readonly process: (message: I) => Stream.Stream<never, E, O>
    readonly transfers?: (message: I) => ReadonlyArray<unknown>
    readonly permits?: number
    readonly queue?: WorkerQueue<I>
  }

  /**
   * @since 1.0.0
   * @category models
   */
  export type Request<I> = readonly [id: number, data: I]

  /**
   * @since 1.0.0
   * @category models
   */
  export type Response<E, O> =
    | readonly [id: number, error: 0, E]
    | readonly [id: number, data: 1, O]
    | readonly [id: number, end: 2, data?: O]
}

/**
 * @category models
 * @since 1.0.0
 */
export interface WorkerQueue<I> {
  readonly offer: (item: I) => Effect.Effect<never, never, void>
  readonly take: Effect.Effect<never, never, I>
}

/**
 * @since 1.0.0
 * @category type ids
 */
export const WorkerManagerTypeId: unique symbol = internal.WorkerManagerTypeId

/**
 * @since 1.0.0
 * @category type ids
 */
export type WorkerManagerTypeId = typeof WorkerManagerTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface WorkerManager {
  readonly [WorkerManagerTypeId]: WorkerManagerTypeId
  readonly spawn: <I, E, O>(
    options: Worker.Options<I, E, O>
  ) => Effect.Effect<Scope.Scope, WorkerError, Worker<I, E, O>>
}

/**
 * @since 1.0.0
 * @category tags
 */
export const WorkerManager: Context.Tag<WorkerManager, WorkerManager> = internal.WorkerManager

/**
 * @since 1.0.0
 * @category type ids
 */
export const WorkerErrorTypeId: unique symbol = internal.WorkerErrorTypeId

/**
 * @since 1.0.0
 * @category type ids
 */
export type WorkerErrorTypeId = typeof WorkerErrorTypeId

/**
 * @since 1.0.0
 * @category errors
 */
export interface WorkerError extends Data.Case {
  readonly [WorkerErrorTypeId]: WorkerErrorTypeId
  readonly _tag: "WorkerError"
  readonly reason: "spawn" | "unknown"
  readonly error: unknown
}
