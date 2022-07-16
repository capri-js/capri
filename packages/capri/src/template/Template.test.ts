import * as cheerio from "cheerio";
import { describe, expect, test } from "vitest";

import { CheerioTemplate } from "./CheerioTemplate.js";
import { RegExpTemplate } from "./RegExpTemplate.js";

// Fixtures

const hydration = `<script type="module" crossorigin="" src="/dist/assets/hydrate.665a5d68.js"></script>`;

const dynamicImportPolyfill = `<script type="module">try{import("_").catch(()=>1);}catch(e){}window.__vite_is_dynamic_import_support=true;</script>
<script type="module">!function(){if(window.__vite_is_dynamic_import_support)return;console.warn("vite: loading legacy build because dynamic import is unsupported, syntax error above should be ignored");var e=document.getElementById("vite-legacy-polyfill"),n=document.createElement("script");n.src=e.src,n.onload=function(){System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))},document.body.appendChild(n)}();</script>`;

const viteLegacy = `<script nomodule="">!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",(function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()}),!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();</script>
<script nomodule="" id="vite-legacy-polyfill" src="/dist/assets/polyfills-legacy.3dc4c6c1.js"></script>
<script nomodule="" id="vite-legacy-entry" data-src="/dist/assets/hydrate-legacy.439310c5.js">System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))</script>`;

const modulePreload = `<link rel="modulepreload" href="/chunk.1.js">
< link href="/chunk.2.js" rel = "modulepreload" >
<link href='/chunk.3.js' rel='modulepreload'>
<link href="/chunk.4.js" rel=modulepreload/>`;

const app = `<main><h1>Partial hydration with Capri</h1><section>Here is a simple counter: <capri-island style="display:contents"><div class="counter" data-testid="counter"><button>-</button><span>0</span><button>+</button></div><script type="application/json" data-island="/src/Counter.island.tsx">{"props":{}}</script></capri-island></section><section>And here is another one, independent from the one above: <capri-island style="display:contents"><div class="counter" data-testid="counter"><button>-</button><span>100</span><button>+</button></div><script type="application/json" data-island="/src/Counter.island.tsx">{"props":{"start":100}}</script></capri-island></section><capri-island style="display:contents"><div class="expandable box" data-expanded="false"><capri-lagoon style="display:contents"><div class="box">This is static content inside an island. We call this a lagoon.</div></capri-lagoon><button>Click to expand</button><div class="expandable-content"><capri-lagoon style="display:contents"><div class="box">This a second lagoon. Below you see the children that were passed to the Expandable island:</div></capri-lagoon><capri-children style="display:contents">This island receives children as prop. They are only rendered upon build time.<div>The code for <code>ServerContent</code> won't show up in the client bundle.</div></capri-children></div></div><script type="application/json" data-island="/src/Expandable.island.tsx">{"props":{"title":"Click to expand"}}</script></capri-island><capri-island style="display:contents"><div class="box">Resize your browser below 500px to hydrate this island.</div><script type="application/json" data-island="/src/MediaQuery.island.tsx">{"props":{},"options":{"media":"(max-width:500px)"}}</script></capri-island><a href="/Users/fgnass/Projects/capri-js/capri/examples/react/dist/about">Link to another page</a></main>`;

const template = ({
  app = "",
  body = "",
  head = "",
  hydration = "",
  modulePreload = "",
  dynamicImportPolyfill = "",
  viteLegacy = "",
}) => `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/dist/assets/capri.ce1c56b3.svg">
${hydration}${modulePreload}<link rel="stylesheet" href="/dist/assets/main.b1b3a89c.css">
<link rel="stylesheet" href="/dist/assets/Counter.island.9a7e7aed.css">
<link rel="stylesheet" href="/dist/assets/Expandable.island.e8e34690.css">
${dynamicImportPolyfill}${head}</head>
<body>
<div id="app">${app}</div>

${viteLegacy}${body}</body></html>`;

// Test both implementations...
describe.each([
  { name: "RegExpTemplate", Template: RegExpTemplate },
  { name: "CheerioTemplate", Template: CheerioTemplate },
])("$name", ({ Template }) => {
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

  test("removeModulePreloadLinks", () => {
    const t = new Template(template({ modulePreload }));
    t.removeModulePreloadLinks();
    expect(format(t.toString())).toEqual(format(template({})));
  });

  test("removeScripts", () => {
    const t = new Template(
      template({ viteLegacy, hydration, dynamicImportPolyfill })
    );
    t.removeScripts({
      src: /hydrate|-legacy/,
      text: /__vite_is_dynamic_import_support|"noModule"|_\$HY/,
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
});

/**
 * Parse and serialize the given HTML so that differences in whitespace
 * don't affect the assertions.
 */
function format(html: string) {
  return cheerio.load(html).toString();
}
