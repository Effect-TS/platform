/// <reference types="vitest" />

import babel from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelConfig = require("./.babel.mjs.json")

export default defineConfig({
  plugins: [babel({ babel: babelConfig })],
  test: {
    include: ["packages/*/test/**/*.test.ts"],
    globals: true
  },
  resolve: {
    alias: {
      "@effect/platform/test": path.join(__dirname, "packages/platform/test"),
      "@effect/platform": path.join(__dirname, "packages/platform/src"),

      "@effect/platform-browser/test": path.join(__dirname, "packages/platform-browser/test"),
      "@effect/platform-browser": path.join(__dirname, "packages/platform-browser/src"),

      "@effect/platform-node/test": path.join(__dirname, "packages/platform-node/test"),
      "@effect/platform-node": path.join(__dirname, "packages/platform-node/src")
    }
  }
})
