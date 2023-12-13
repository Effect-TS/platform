/**
 * @since 1.0.0
 */

import * as Socket from "@effect/platform-browser/WebSocket";
import { Chunk, Effect, Sink, Stream } from 'effect';
import { afterEach, describe, expect, it } from 'vitest';
import 'vitest-websocket-mock';
import WS from 'vitest-websocket-mock';

const url = 'ws://localhost:1234'
const run = <E, A>(effect: Effect.Effect<Socket.Socket, E, A>) =>
    Effect.runPromise(Effect.provide(effect, Socket.layer(url)))


describe("WebSocket", () => {

    afterEach(() => {
        WS.clean();
    })

    it("send", async () => {
        const server = new WS(url);

        await run(Effect.gen(function* (_) {
            const ws = yield* _(Socket.Socket)
            yield* _(ws.send("Hello"))
        }))

        // @ts-ignore
        await expect(server).toReceiveMessage('Hello');
    })

    it("messages", async () => {
        const server = new WS(url);
        const msgStream = Effect.map(Socket.Socket, socket => socket.messages).pipe(Stream.unwrap)

        run(Stream.run(msgStream, Sink.collectAll())).then(msg => 
            expect(msg).toEqual(Chunk.fromIterable(["first", "second"]))
        )

        await server.connected
        server.send("first")
        server.send("second")
        server.close()
    })

    it("errors", async () => {
        const server = new WS(url);
        const errStream = Effect.map(Socket.Socket, socket => socket.errors).pipe(Stream.unwrap)

        run(Stream.run(errStream, Sink.collectAll())).then(msg => 
            expect(msg.length).toEqual(1)
        )

        await server.connected
        server.error()
    })

})
