import * as FormData from "@effect/platform/Http/FormData"
import * as Cause from "effect/Cause"
import * as Channel from "effect/Channel"
import * as Stream from "effect/Stream"
import type { IncomingHttpHeaders } from "node:http"
import type { Readable } from "node:stream"

const makeChannel = (source: Readable, headers: IncomingHttpHeaders) =>
  Channel.flatMap(
    FormData.makeConfig(headers as any),
    (config) =>
      Channel.suspend(() => {
        let error: Cause.Cause<FormData.FormDataError> | null = null
        source.once("error", (err) => {
          error = Cause.fail(FormData.FormDataError("InternalError", err))
        })

        function read() {
          const chunks: Array<Uint8Array> = []
          let chunk: Uint8Array | null = null
          while ((chunk = source.read()) !== null) {
            chunks.push(chunk)
          }
          return chunks
        }

        return FormData.fromPullConfig<FormData.FormDataError>({
          ...config,
          pull(cb) {
            if (source.readableLength > 0) {
              cb(error, read())
            } else if (source.closed) {
              cb(error, null)
            } else {
              source.once("readable", () => {
                cb(error, read())
              })
            }
          }
        })
      })
  )

export const stream = (
  source: Readable,
  headers: IncomingHttpHeaders
): Stream.Stream<never, FormData.FormDataError, FormData.Part> => Stream.fromChannel(makeChannel(source, headers))

/** @internal */
export const formData = (
  source: Readable,
  headers: IncomingHttpHeaders
) => FormData.formData(stream(source, headers))
