# ![Capri](logo.svg)

Capri allows you to build static websites using a frontend framework of your choice ([React/Preact/Vue/Solid/Svelte](https://capri.build/docs/frameworks/)).

## Carbon-friendly 🌱

By default, **zero KB** of JavaScript is shipped to the browser.

You can sprinkle in client-side interactivity by turning some of your components into [islands](https://jasonformat.com/islands-architecture/). Capri will make sure, that only that part of your JavaScript is sent down the wire that is required to let these islands become interactive.

## Use what you already know 🎓

With Capri, you don't have to learn any new APIs. In fact, Capri doesn't even have an API! Use your framework's regular ecosystem as if you were building a single page app and follow these two rules:

1. 📍 Pick a router that supports server-side rendering (pretty much all popular routing libraries do this).
2. 🏝️ If a component needs to become interactive, name it `*.island.*`. Capri will take care of the rest.

👉 Visit https://capri.build to get started.

## No lock-in 🔓

Should you ever decide to remove Capri from your project, you will be left with a 100% working [Vite](https://vitejs.dev/) app. Of course, instead of pre-rendered static pages, the output will then be a regular SPA.

## Bonus: Live CMS previews 🔮

When you [connect](https://capri.build/docs/integrations/) your Capri website to a headless CMS, you can take further advantage of Capri's architecture, as it allows you to generate a separate SPA version of your site that can be used to live-preview any content changes without requiring a build-step or server-side rendering. You can use cheap and energy efficient static file hosting and still get real-time previews right inside your CMS.

# License

MIT
