/**
 * @since 1.0.0
 */
import type * as Context from "@effect/data/Context"
import type * as Effect from "@effect/io/Effect"
import type * as Layer from "@effect/io/Layer"
import type * as ClientRequest from "@effect/platform/Http/ClientRequest"
import type * as ClientResponse from "@effect/platform/Http/ClientResponse"
import type * as Error from "@effect/platform/Http/Error"
import * as internal from "@effect/platform/internal/http/client"

/**
 * @since 1.0.0
 * @category models
 */
export interface Client<R, E, A>
  extends Effect.Effect<ClientRequest.ClientRequest | Exclude<R, ClientRequest.ClientRequest>, E, A>
{}

/**
 * @since 1.0.0
 */
export namespace Client {
  /**
   * @since 1.0.0
   * @category models
   */
  export type WithResponse<R, E> = Client<R, E, ClientResponse.ClientResponse>

  /**
   * @since 1.0.0
   * @category models
   */
  export type Default = WithResponse<never, Error.HttpError>
}

/**
 * @since 1.0.0
 * @category tags
 */
export const Client: Context.Tag<Client.Default, Client.Default> = internal.tag

/**
 * @since 1.0.0
 * @category layers
 */
export const fetchLayer: Layer.Layer<never, never, Client.Default> = internal.fetchLayer

/**
 * @since 1.0.0
 * @category constructors
 */
export const fetch: (options?: RequestInit) => Client.Default = internal.fetch

/**
 * @since 1.0.0
 * @category constructors
 */
export const fetchOk: (options?: RequestInit) => Client.Default = internal.fetchOk

/**
 * @since 1.0.0
 * @category filters
 */
export const filterStatus: {
  (
    f: (status: number) => boolean
  ): <R, E>(self: Client.WithResponse<R, E>) => Client.WithResponse<R, Error.StatusError | E>
  <R, E>(self: Client.WithResponse<R, E>, f: (status: number) => boolean): Client.WithResponse<R, Error.StatusError | E>
} = internal.filterStatus

/**
 * @since 1.0.0
 * @category filters
 */
export const filterStatusOk: <R, E>(self: Client.WithResponse<R, E>) => Client.WithResponse<R, Error.StatusError | E> =
  internal.filterStatusOk
