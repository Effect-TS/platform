/** @internal */
export const encode = (bytes: Uint8Array) => Buffer.from(bytes).toString("hex")

/** @internal */
export const decode = (str: string) => Uint8Array.from(Buffer.from(str, "hex"))
