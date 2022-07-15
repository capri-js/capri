# Capri 🍋 SSR on Vercel

Use `@capri-js/vercel` to render your static pages using either

- a [serverless function](https://vercel.com/docs/concepts/functions/serverless-functions)
- a [prerender function](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)
- or an [edge function](https://vercel.com/docs/build-output-api/v3#vercel-primitives/edge-functions)

_NOTE:_ This is only needed for SSR. For static sites that are prerendered upon build,
leave the target set to `undefined`.

https://vercel.com/docs/build-output-api/v3

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import capri from "@capri-js/react";
import vercel from "@capri-js/vercel";

export default defineConfig({
  plugins: [
    react(),
    capri({
      target: vercel({
        // options (see below)
      }),
    }),
  ],
});
```

## Options

### `edge`

Whether to create an edge function (default `false`).

### `isg`

Settings for [Incremental Static Rendering](https://vercel.com/docs/build-output-api/v3#vercel-primitives/prerender-functions/configuration).

```ts
{
  expiration: number | false;
  bypassToken?: string;
}
```
