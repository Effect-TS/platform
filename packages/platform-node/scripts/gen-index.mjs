import * as Fs from "node:fs";

const modules = Fs.readdirSync("src")
  .filter((_) => _ !== "index.ts" && _.endsWith(".ts"))
  .map((_) => _.slice(0, -3));

console.log(
  modules
    .map((module) => {
      const content = Fs.readFileSync(`src/${module}.ts`, "utf8");
      const topComment = content.match(/\/\*\*\n.+?\*\//s)?.[0] ?? "";
      return `${topComment}
export * as ${module} from "@effect/platform-node/${module}"`;
    })
    .join("\n\n")
);
