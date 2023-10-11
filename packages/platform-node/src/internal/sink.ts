import type { LazyArg } from "effect/Function"
import * as Sink from "effect/Sink"
import type { Writable } from "node:stream"
import type { FromWritableOptions } from "../Stream"
import { writeChannel } from "./stream"

/** @internal */
export const fromWritable = <E, A = Uint8Array>(
  evaluate: LazyArg<Writable>,
  onError: (error: unknown) => E,
  options: FromWritableOptions = {}
): Sink.Sink<never, E, A, never, void> =>
  Sink.suspend(() => Sink.fromChannel(writeChannel(evaluate(), onError, options)))
