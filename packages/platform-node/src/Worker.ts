/**
 * @since 1.0.0
 *
 * Also includes exports from [`@effect/platform/Worker`](https://effect-ts.github.io/platform/platform/Worker.ts.html).
 */
import type * as Worker from "@effect/platform/Worker"
import type { Effect } from "effect"
import type * as Layer from "effect/Layer"
import type * as Pool from "effect/Pool"
import type * as Scope from "effect/Scope"
import type * as Stream from "effect/Stream"
import type * as WorkerThreads from "node:worker_threads"
import * as internal from "./internal/worker"

export * from "@effect/platform/Worker"

/**
 * @since 1.0.0
 * @category constructors
 */
export const makeRunner: <I, R, E, O>(
  process: (request: I) => Stream.Stream<R, E, O>,
  options?: Worker.Runner.Options<O> | undefined
) => Effect.Effect<R | Scope.Scope, Worker.WorkerError, void> = internal.makeRunner

/**
 * @since 1.0.0
 * @category constructors
 */
export const makePool: <I, E, O>(
  options: Worker.Worker.PoolOptions<I, WorkerThreads.Worker>
) => Effect.Effect<Scope.Scope, never, Pool.Pool<Worker.WorkerError, Worker.Worker<I, E, O>>> = internal.makePool

/**
 * @since 1.0.0
 * @category layers
 */
export const layerManager: Layer.Layer<never, never, Worker.WorkerManager> = internal.layerManager

/**
 * @since 1.0.0
 * @category layers
 */
export const layerWorker: Layer.Layer<never, never, Worker.PlatformWorker> = internal.layerWorker
