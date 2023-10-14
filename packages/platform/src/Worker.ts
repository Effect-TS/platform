/**
 * @since 1.0.0
 */
import type { Effect } from "effect"
import type * as Context from "effect/Context"
import type * as Data from "effect/Data"
import type * as Fiber from "effect/Fiber"
import type * as Layer from "effect/Layer"
import type * as Queue from "effect/Queue"
import type * as Scope from "effect/Scope"
import type * as Stream from "effect/Stream"
import * as internal from "./internal/worker"

/**
 * @since 1.0.0
 * @category models
 */
export interface BackingWorker<I, O> {
  readonly fiber: Fiber.Fiber<WorkerError, never>
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
  export type Message<O> = readonly [ready: 0] | readonly [error: 1, O]
}

/**
 * @since 1.0.0
 * @category type ids
 */
export const BackingWorkerPlatformTypeId: unique symbol = internal.BackingWorkerPlatformTypeId

/**
 * @since 1.0.0
 * @category type ids
 */
export type BackingWorkerPlatformTypeId = typeof BackingWorkerPlatformTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface BackingWorkerPlatform {
  readonly [BackingWorkerPlatformTypeId]: BackingWorkerPlatformTypeId
  readonly spawn: <I, O>(
    evaluate: Effect.Effect<never, WorkerError, unknown>
  ) => Effect.Effect<Scope.Scope, WorkerError, BackingWorker<I, O>>
}

/**
 * @since 1.0.0
 * @category tags
 */
export const PlatformBackingWorker: Context.Tag<BackingWorkerPlatform, BackingWorkerPlatform> =
  internal.BackingWorkerPlatform

/**
 * @since 1.0.0
 * @category models
 */
export interface BackingRunner<I, O> {
  readonly fiber: Fiber.Fiber<WorkerError, void>
  readonly queue: Queue.Dequeue<BackingRunner.Message<I>>
  readonly reply: (message: O, transfers?: ReadonlyArray<unknown>) => Effect.Effect<never, never, void>
}

/**
 * @since 1.0.0
 * @category models
 */
export declare namespace BackingRunner {
  /**
   * @since 1.0.0
   * @category models
   */
  export type Message<I> = readonly [request: 0, I] | readonly [close: 1]
}

/**
 * @since 1.0.0
 * @category type ids
 */
export const BackingRunnerPlatformTypeId: unique symbol = internal.BackingRunnerPlatformTypeId

/**
 * @since 1.0.0
 * @category type ids
 */
export type BackingRunnerPlatformTypeId = typeof BackingRunnerPlatformTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface BackingRunnerPlatform {
  readonly [BackingRunnerPlatformTypeId]: BackingRunnerPlatformTypeId
  readonly start: <I, O>() => Effect.Effect<Scope.Scope, WorkerError, BackingRunner<I, O>>
}

/**
 * @since 1.0.0
 * @category tags
 */
export const PlatformBackingRunner: Context.Tag<BackingRunnerPlatform, BackingRunnerPlatform> =
  internal.BackingRunnerPlatform

/**
 * @since 1.0.0
 * @category models
 */
export interface Worker<I, E, O> {
  readonly id: number
  readonly fiber: Fiber.Fiber<WorkerError, never>
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
  export interface Options<I> {
    readonly spawn: (id: number) => Effect.Effect<never, WorkerError, unknown>
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
    | readonly [id: number, data: 0, O]
    | readonly [id: number, end: 1]
    | readonly [id: number, error: 2, E]
    | readonly [id: number, defect: 3, unknown]
}

/**
 * @category models
 * @since 1.0.0
 */
export interface WorkerQueue<I> {
  readonly offer: (id: number, item: I) => Effect.Effect<never, never, void>
  readonly take: Effect.Effect<never, never, readonly [id: number, item: I]>
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
    options: Worker.Options<I>
  ) => Effect.Effect<Scope.Scope, WorkerError, Worker<I, E, O>>
}

/**
 * @since 1.0.0
 * @category tags
 */
export const WorkerManager: Context.Tag<WorkerManager, WorkerManager> = internal.WorkerManager

/**
 * @since 1.0.0
 * @category constructors
 */
export const makeManager: Effect.Effect<BackingWorkerPlatform, never, WorkerManager> = internal.makeManager

/**
 * @since 1.0.0
 * @category layers
 */
export const layerManager: Layer.Layer<BackingWorkerPlatform, never, WorkerManager> = internal.layerManager

/**
 * @since 1.0.0
 * @category constructors
 */
export const makeRunner: <I, E, O>(
  process: (request: I) => Stream.Stream<never, E, O>
) => Effect.Effect<Scope.Scope | BackingRunnerPlatform, WorkerError, void> = internal.makeRunner

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
