import * as Context from "@effect/data/Context"
import * as Option from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import * as FileSystem from "@effect/platform/FileSystem"
import type * as KeyValueStore from "@effect/platform/KeyValueStore"
import * as Path from "@effect/platform/Path"

/** @internal */
export const TypeId: KeyValueStore.TypeId = Symbol.for(
  "@effect/platform/KeyValueStore"
) as KeyValueStore.TypeId

/** @internal */
export const tag = Context.Tag<KeyValueStore.KeyValueStore>(TypeId)

/** @internal */
export const make: (
  impl: Omit<KeyValueStore.KeyValueStore, KeyValueStore.TypeId | "has" | "setMany" | "modify" | "isEmpty">
) => KeyValueStore.KeyValueStore = (impl) =>
  tag.of({
    ...impl,
    [TypeId]: TypeId,
    has: (key) => impl.get(key).pipe(Effect.map(Option.isSome)),
    isEmpty: Effect.map(impl.size, (size) => size === 0),

    modify: (key, f) =>
      Effect.gen(function*(_) {
        const value = yield* _(impl.get(key))

        if (Option.isNone(value)) {
          return Option.none()
        }

        const newValue = f(value.value)

        yield* _(impl.set(key, newValue))

        return Option.some(newValue)
      })
  })

/** @internal */
export const layerMemory = Layer.sync(tag, () => {
  const store = new Map<string, string>()

  return make({
    get: (key: string) => Effect.sync(() => Option.fromNullable(store.get(key))),
    set: (key: string, value: string) => Effect.sync(() => store.set(key, value)),
    remove: (key: string) => Effect.sync(() => store.delete(key)),
    clear: Effect.sync(() => store.clear()),
    size: Effect.sync(() => store.size)
  })
})

// WARNING: Untested
/** @internal */
export const layerFileSystem = (directory: string) =>
  Layer.effect(
    tag,
    Effect.gen(function*(_) {
      const fs = yield* _(FileSystem.FileSystem)
      const path = yield* _(Path.Path)
      const keyPath = (key: string) => path.join(directory, key)

      if (!(yield* _(fs.exists(directory)))) {
        yield* _(fs.makeDirectory(directory))
      }

      return make({
        get: (key: string) =>
          fs.readFileString(keyPath(key)).pipe(
            Effect.map(Option.some),
            Effect.catchTag(
              "SystemError",
              (sysError) => sysError.reason === "NotFound" ? Effect.succeed(Option.none()) : Effect.fail(sysError)
            )
          ),
        set: (key: string, value: string) => fs.writeFileString(keyPath(key), value),
        remove: (key: string) => fs.remove(keyPath(key)),
        clear: fs.remove(directory, { recursive: true }).pipe(Effect.flatMap(() => fs.makeDirectory(directory))),
        size: fs.readDirectory(directory).pipe(Effect.map((files) => files.length))
      })
    })
  )
