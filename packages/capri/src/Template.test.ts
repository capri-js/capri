import { describe, expect, test } from "vitest";

import { Template } from "./Template.js";

// Fixtures

const hydration = `<script type="module" crossorigin="" src="/dist/assets/hydrate.665a5d68.js"></script>`;

const dynamicImportPolyfill = `<script type="module">try{import.meta.url;import("_").catch(()=>1);}catch(e){}window.__vite_is_modern_browser=true;</script>
<script type="module">!function(){if(window.__vite_is_modern_browser)return;console.warn("vite: loading legacy build because dynamic import or import.meta.url is unsupported, syntax error above should be ignored");var e=document.getElementById("vite-legacy-polyfill"),n=document.createElement("script");n.src=e.src,n.onload=function(){System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))},document.body.appendChild(n)}();</script>`;

const viteLegacy = `<script nomodule="">!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",(function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()}),!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();</script>
<script nomodule="" crossorigin="" id="vite-legacy-polyfill" src="/dist/assets/polyfills-legacy.7780630f.js"></script>
<script nomodule="" crossorigin="" id="vite-legacy-entry" data-src="/dist/assets/hydrate-legacy.902f4184.js">System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))</script>`;

const counterIslandHref = "/dist/assets/Counter.island.9a7e7aed.css";
const expandableIslandHref = "/dist/assets/Expandable.island.e8e34690.css";

const islandCss = `<link rel="stylesheet" href="${counterIslandHref}">
<link rel="stylesheet" href="${expandableIslandHref}">`;

const app = `<main><h1>Partial hydration with Capri</h1><section>Here is a simple counter: <capri-island style="display:contents"><div class="counter" data-testid="counter"><button>-</button><span>0</span><button>+</button></div><script type="application/json" data-island="/src/Counter.island.tsx">{"props":{}}</script></capri-island></section><section>And here is another one, independent from the one above: <capri-island style="display:contents"><div class="counter" data-testid="counter"><button>-</button><span>100</span><button>+</button></div><script type="application/json" data-island="/src/Counter.island.tsx">{"props":{"start":100}}</script></capri-island></section><capri-island style="display:contents"><div class="expandable box" data-expanded="false"><button>Click to expand</button><div class="expandable-content"><capri-children style="display:contents">This island receives children as prop. They are only rendered upon build time.<div>The code for <code>ServerContent</code> won't show up in the client bundle.</div></capri-children></div></div><script type="application/json" data-island="/src/Expandable.island.tsx">{"props":{"title":"Click to expand"}}</script></capri-island><capri-island style="display:contents"><div class="box">Resize your browser below 500px to hydrate this island.</div><script type="application/json" data-island="/src/MediaQuery.island.tsx">{"props":{},"options":{"media":"(max-width:500px)"}}</script></capri-island><a href="/Users/fgnass/Projects/capri-js/capri/examples/react/dist/about">Link to another page</a></main>`;

const template = ({
  app = "",
  body = "",
  head = "",
  hydration = "",
  css = islandCss,
  dynamicImportPolyfill = "",
  viteLegacy = "",
}) => `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/dist/assets/capri.ce1c56b3.svg">
${hydration}
<link rel="stylesheet" href="/dist/assets/main.b1b3a89c.css">
${css}
${dynamicImportPolyfill}${head}</head>
<body>
<div id="app">${app}</div>

${viteLegacy}${body}</body></html>`;

describe("insertMarkup", () => {
  test("#app", () => {
    const app = "<h1>Hello world</h1>";
    const t = new Template(template({}));
    t.insertMarkup({ "#app": app });
    expect(format(t.toString())).toEqual(format(template({ app })));
  });
  test("body", () => {
    const body = "<h1>Hello world</h1>";
    const t = new Template(template({}));
    t.insertMarkup({ body: body });
    expect(format(t.toString())).toEqual(format(template({ body })));
  });
});

test("removeScripts", () => {
  const t = new Template(
    template({ viteLegacy, hydration, dynamicImportPolyfill })
  );
  t.removeScripts({
    src: /hydrate|-legacy/,
    text: /__vite_is_modern_browser|vite-legacy-entry|"noModule"|_\$HY/,
  });
  expect(format(t.toString())).toEqual(format(template({})));
});

test("getIslands", () => {
  const t = new Template(template({ app }));
  expect(t.getIslands()).toMatchObject([
    { island: "/src/Counter.island.tsx", json: '{"props":{}}' },
    { island: "/src/Counter.island.tsx", json: '{"props":{"start":100}}' },
    {
      island: "/src/Expandable.island.tsx",
      json: '{"props":{"title":"Click to expand"}}',
    },
    {
      island: "/src/MediaQuery.island.tsx",
      json: '{"props":{},"options":{"media":"(max-width:500px)"}}',
    },
  ]);
});

/**
 * Replace all whitespace between tags with a single line break
 * so that they don't affect the assertions.
 */
function format(html: string) {
  return html.replace(/>\s*</g, ">\n<");
}
