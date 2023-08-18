---
title: Http/NodeClient.ts
nav_order: 6
parent: "@effect/platform-node"
---

## NodeClient overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [agent](#agent)
  - [HttpAgent](#httpagent)
  - [HttpAgent (interface)](#httpagent-interface)
  - [HttpAgentTypeId](#httpagenttypeid)
  - [HttpAgentTypeId (type alias)](#httpagenttypeid-type-alias)
  - [agentLayer](#agentlayer)
  - [makeAgent](#makeagent)
  - [makeAgentLayer](#makeagentlayer)
- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerWithoutAgent](#layerwithoutagent)

---

# agent

## HttpAgent

**Signature**

```ts
export declare const HttpAgent: Context.Tag<HttpAgent, HttpAgent>
```

Added in v1.0.0

## HttpAgent (interface)

**Signature**

```ts
export interface HttpAgent {
  readonly [HttpAgentTypeId]: typeof HttpAgentTypeId
  readonly http: Http.Agent
  readonly https: Https.Agent
}
```

Added in v1.0.0

## HttpAgentTypeId

**Signature**

```ts
export declare const HttpAgentTypeId: typeof HttpAgentTypeId
```

Added in v1.0.0

## HttpAgentTypeId (type alias)

**Signature**

```ts
export type HttpAgentTypeId = typeof HttpAgentTypeId
```

Added in v1.0.0

## agentLayer

**Signature**

```ts
export declare const agentLayer: Layer.Layer<never, never, HttpAgent>
```

Added in v1.0.0

## makeAgent

**Signature**

```ts
export declare const makeAgent: (options?: Https.AgentOptions) => Effect.Effect<Scope.Scope, never, HttpAgent>
```

Added in v1.0.0

## makeAgentLayer

**Signature**

```ts
export declare const makeAgentLayer: (options?: Https.AgentOptions) => Layer.Layer<never, never, HttpAgent>
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: Effect.Effect<HttpAgent, never, Client.Client.Default>
```

Added in v1.0.0

# layers

## layer

**Signature**

```ts
export declare const layer: Layer.Layer<never, never, Client.Client.Default>
```

Added in v1.0.0

## layerWithoutAgent

**Signature**

```ts
export declare const layerWithoutAgent: Layer.Layer<HttpAgent, never, Client.Client.Default>
```

Added in v1.0.0
