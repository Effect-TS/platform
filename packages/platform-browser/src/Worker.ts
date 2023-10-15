/**
 * @since 1.0.0
 *
 * Also includes exports from [`@effect/platform/Worker`](https://effect-ts.github.io/platform/platform/Worker.ts.html).
 */
import type * as Worker from "@effect/platform/Worker"
import type { Effect } from "effect"
import type * as Layer from "effect/Layer"
import type * as Scope from "effect/Scope"
import * as internal from "./internal/worker"

/**
 * @since 1.0.0
 */
export * from "@effect/platform/Worker"

/**
 * @since 1.0.0
 * @category constructors
 */
export const makePool: <I, E, O>(
  options: Worker.WorkerPool.Options<I, Worker | SharedWorker>
) => Effect.Effect<Scope.Scope, never, Worker.WorkerPool<I, E, O>> = internal.makePool

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
