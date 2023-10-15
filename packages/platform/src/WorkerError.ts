/**
 * @since 1.0.0
 */
import type * as Data from "effect/Data"
import * as internal from "./internal/workerError"

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
  readonly reason: "spawn" | "decode" | "unknown"
  readonly error: unknown
}

/**
 * @since 1.0.0
 * @category errors
 */
export const WorkerError: (reason: "spawn" | "decode" | "unknown", error: unknown) => WorkerError = internal.WorkerError
