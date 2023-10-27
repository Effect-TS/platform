/**
 * @since 1.0.0
 */
import type { Effect } from "effect"
import type * as Context from "effect/Context"
import type * as Fiber from "effect/Fiber"
import type * as Queue from "effect/Queue"
import type * as Scope from "effect/Scope"
import type * as Stream from "effect/Stream"
import * as internal from "./internal/workerRunner"
import type { WorkerError } from "./WorkerError"

/**
 * @since 1.0.0
 * @category models
 */
export interface BackingRunner<I, O> {
  readonly fiber: Fiber.Fiber<WorkerError, void>
  readonly queue: Queue.Dequeue<I>
  readonly send: (message: O, transfers?: ReadonlyArray<unknown>) => Effect.Effect<never, never, void>
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
export const PlatformRunnerTypeId: unique symbol = internal.PlatformRunnerTypeId

/**
 * @since 1.0.0
 * @category type ids
 */
export type PlatformRunnerTypeId = typeof PlatformRunnerTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface PlatformRunner {
  readonly [PlatformRunnerTypeId]: PlatformRunnerTypeId
  readonly start: <I, O>() => Effect.Effect<Scope.Scope, WorkerError, BackingRunner<I, O>>
}

/**
 * @since 1.0.0
 * @category tags
 */
export const PlatformRunner: Context.Tag<PlatformRunner, PlatformRunner> = internal.PlatformRunner

/**
 * @since 1.0.0
 * @category models
 */
export declare namespace Runner {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Options<O> {
    readonly encode?: (message: O) => unknown
    readonly transfers?: (message: O) => ReadonlyArray<unknown>
  }
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: <I, R, E, O>(
  process: (request: I) => Stream.Stream<R, E, O> | Effect.Effect<R, E, O>,
  options?: Runner.Options<O> | undefined
) => Effect.Effect<Scope.Scope | R | PlatformRunner, WorkerError, void> = internal.make
