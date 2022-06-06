# ![Capri](logo.svg)

Capri is a static site generator that supports partial hydration, also known as [islands architecture](https://jasonformat.com/islands-architecture/), as well as live CMS previews that don't require SSR or a build-step.

# Features

- ⚛️ Supports React, Preact and SolidJS
- 🏝 Selectively hydrates interactive parts (islands)
- 🔮 Optionally creates an SPA to render CMS previews
- ⚡️ Takes advantage of Vite's asset handling

## Bring your own router

In contrast to other frameworks of its kind, Capri does not come with a built-in router. This allows you to use any router you want. Depending on your site, you might not even need a router at all.

## Bring your own data fetching

Capri does not care about how you load your data. The provided framework adapters all support async rendering so that you can use suspense-style patterns to _render as you fetch_.

In other words, you can build your site the same way as you would build an SPA.

## SPA for CMS live previews

One of the advantages of using the same patterns you would normally use in a single page app is that you get an SPA on top for free! This comes in really handy if you want to preview content changes in your CMS without waiting for a complete rebuild of your site.

## Partial Hydration

Pages generated by Capri are completely static by default and don't ship any JavaScript code to the client. In order to add some interactivity back to your site you can mark sections of your pages as islands. These islands will then get hydrated as isolated, independent roots. Since their markup has already been rendered upon build, there won't be any flickering or layout shifts. And since the browser does not have to download the code for your whole site but only for some smaller parts, the overall download size will be much smaller.

Check out the [creating an island](#creating-an-island) section to learn how to define islands right inside your React/Preact/SoildJS components.

## Automatic link traversal

After a page has been rendered, Capri parses the output and looks for internal links. The linked pages will get prerendered too, so that it is often enough to just point Capri to `/` (the default) and let it do the rest.

# Usage

## Getting started

```
npm init capri <my-project-name>
```

By default, the project will use the preact example. You can specify a different one using the `-e` option:

```
npm init capri <my-project-name> -- -e react
```

For a full example with CMS integration and live preview click the button below:

[![Try on sanity.io](./sanity.svg)](https://www.sanity.io/create?template=capri-js%2Fsanity-template-capri-react)

## Adding Capri to an existing Vite project

If you have an existing Vite project for a single page app, you can add static site generation with a few steps:

(1) Install the Capri Vite plugin for your framework of choice:

`npm install --save-dev @capri-js/react` (or preact or solid)

(2) Add the plugin to your `vite.config.ts` file:

```ts
import capri from "@capri-js/react";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), capri()],
});
```

(3) Modify the build script in your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && vite build --ssr"
  }
}
```

(4) Add a server entry script (see below).

## Server entry script

To generate static markup, Capri expects a file called `<your-entry>.server.*` right next to your client side entry script. If for example your `index.html` points to `./src/main.tsx` Capri looks for a file called `./src/main.server.tsx`. Take a look at the different framework demos for a real world example.

The render function receives the pathname of the page to be rendered as argument and returns the markup to be injected into the index.html file.
The markup is returned as object with CSS selectors as keys. This makes it possible to inject different chunks of HTML into different locations of the template, for example `head` and `#root`.

## Paths to prerender

Capri always starts with rendering `"/"` and proceeds
with all local links it encounters. In order to render paths that are not discoverable via links, you can add an async `getStaticPaths()` function to your server entry script.

## Creating an island

Create a regular React/Preact/SolidJS component and name it `*.island.(tsx|jsx)`.

Import the `island` function from `virtual:island` to create a higher order component like this:

```tsx
import { useState } from "preact/hooks";
import { island } from "virtual:island";

export function Counter() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      {counter}
      <button onClick={() => setCounter((c) => c + 1)}>+</button>
    </div>
  );
}

export const CounterIsland = island(Counter);
```

Use that wrapped component in your app to opt in to client-side hydration for that particular subtree.

# Capri internals

Internally, Capri uses the following ingredients to do its magic:

- [Glob imports](https://vitejs.dev/guide/features.html#glob-import)
- [Virtual modules](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention)
- [Vite SSR support](https://vitejs.dev/guide/ssr.html)

The site is built in two passes: First, a regular client-build is performed, like with any Vite-based project. Afterwards, a SSR build is performed that produces a file which can then be run by Node to render individual pages. This more or less the process which is described in the Vite [Server-Side rendering](https://vitejs.dev/guide/ssr.html) guide.

Key to the partial hydration is the `island` function, which is provided through a virtual module. Depending on whether the build is performed in client or server mode, a different implementation is returned.

For client builds, the island function is a no-op, it returns the passed-in component verbatim.

For server builds, the function returns a higher order component that renders a fragment: The original component followed by a script tag.

That script tag is of type `application/json` and contains the component's initial props, serialized as JSON. It also has a `data-island` attribute that identifies the component. The value is the moduleId of the component's rollup chunk.

In order to obtain this ID, the island module calls `import.meta.globEager()` to find all components that match the configured glob pattern. It then compares the passed component to all found island components (using a `===` check).

During the client-build, a hydration script is emitted that calls `import.meta.glob()` with the configured pattern and instead of its eager counterpart, this yields a list of dynamic imports!

The rest is a matter of finding all hydration marker scripts in the DOM and hydrating their preceding siblings.

# Motivation

We were looking for the most carbon efficient way to build small websites with modern tools and a component-based workflow.

Since everyone on the team is familiar with React, it should be using React (or rather, Preact) under the hood.

Apart from that, the content should be managed via a headless CMS so that even non-technical people can edit the site in a page-builder-style fashion.

With regard to rendering strategies, it quickly became apparent that static site generation (SSG) is the most resource-efficient option for operating a website.

So these were the requirements in a nutshell:

- Generate static HTML pages, hosted on Firebase or Cloudflare
- Ship as little JS to the client as possible
- Use a cloud based, headless CMS to manage the content
- Generate an SPA to support live previews while editing

# Capri vs. X

Before we went down the rabbit hole of writing a static site generator from scratch, we took a closer look at some other options:

## Astro

[Astro](https://astro.build/) is a great option for generating static sites with partial hydration. It even lets you mix components from various frameworks and supports some advanced hydration strategies like using intersection observers or media queries.

Unfortunately it seems as if components can only be marked as islands from within .astro templates. Therefore all static parts of your site that are ancestors of an island have to be written as Astro components, too.

While Astro component are great (think of them as JSX files with JavaScript frontmatter) they feel somehow alien in a React environment.

## Next.js

While [Next.js](https://nextjs.org/) supports a lot of different rendering strategies, it is [still](https://github.com/vercel/next.js/issues/10344#issuecomment-580701566) lacking support for partial hydration. There are [ways to achieve this](https://medium.com/@luke_schmuke/how-we-achieved-the-best-web-performance-with-partial-hydration-20fab9c808d5) but the developer experience could be a lot better.

## 11ty

[Eleventy](https://www.11ty.dev/) is known for its simplicity as well as its versatility. It is therefore not surprising that [with a](https://markus.oberlehner.net/blog/setting-up-eleventy-with-preact-and-htm/) [little work](https://markus.oberlehner.net/blog/building-partially-hydrated-progressively-enhanced-static-websites-with-isomorphic-preact-and-eleventy/) one can achieve very similar results. And if we resorted to [SSR](https://www.11ty.dev/docs/plugins/serverless/), we could even get the live preview working. So while this certainly is a viable solution, the developer experience could be much better for our particular use case.

## îles

As its french name might suggest, [îles](https://iles-docs.netlify.app/) is also based on Vite. It is quite similar to Astro, but pages are written in Vue or MDX instead. You can write islands using Preact (or various other frameworks) but as with Astro, the static parts above have to be written in Vue or MDX.

## vite-plugin-ssr

While [vite-plugin-ssr](https://vite-plugin-ssr.com/) doesn't support partial hydration, it was that project which got me into the idea of creating my dream tool from scratch. I first tried to use it as a basis for Capri but quickly decided to follow Vite's own [SSR guide](https://vitejs.dev/guide/ssr.html) instead.

## Others

You can learn more about these and other available options in this [excellent article](https://ajcwebdev.com/what-is-partial-hydration-and-why-is-everyone-talking-about-it).

# License

MIT
