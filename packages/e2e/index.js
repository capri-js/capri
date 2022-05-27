// @ts-check

const path = require("path");
const { JSDOM } = require("jsdom");
const { build } = require("vite");

async function test(root) {
  await build({ root, base: "" });
  await build({ root, base: "", build: { ssr: true } });
  const dom = await JSDOM.fromFile(path.join(root, "dist/index.html"), {
    url: `file://${root}/dist/index.html`,
    runScripts: "dangerously",
    resources: "usable",
  });
  console.log(dom.serialize());
  dom.window.addEventListener("load", () => console.log("Loaded!"));
}

test(path.resolve(__dirname, "../../examples/react"));
