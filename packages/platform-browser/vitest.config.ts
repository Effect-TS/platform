/// <reference types="vitest" />
import babel from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelConfig = require("../../.babel.mjs.json")

export default defineConfig({
  plugins: [babel({ babel: babelConfig })],
  test: {
    include: ["./test/**/*.test.ts"],
    globals: true,
    environment: "happy-dom"
  },
  resolve: {
    alias: {
      "@effect/platform/test": path.join(__dirname, "../platform", "test"),
      "@effect/platform": path.join(__dirname, "../platform", "src"),
      "@effect/platform-browser/test": path.join(__dirname, "test"),
      "@effect/platform-browser": path.join(__dirname, "src")
    }
  }
})
