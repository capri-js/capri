# Capri 🍋 SSR on Cloudflare Pages

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import capri from "@capri-js/react";
import cloudflare from "@capri-js/cloudflare";

export default defineConfig({
  plugins: [
    react(),
    capri({
      target: cloudflare({
        // options (see below)
      }),
    }),
  ],
});
```

## Options

The output can be configured using the following options:

### `webStreamsPolyfill`

Some libraries like `react-dom/server` require
the `streams_enable_constructors` feature flag to be enabled. As a workaround, you can set this option to `true`.

### `type` - What kind of function to create

- When set to `"worker"`, Capri will generate a
  `_worker.js` file at the root of your output directory. In this case, Cloudflare will ignore any custom functions present in `/functions`.

- When set to `"middleware`, Capri will generate a
  `/functions/_middleware.js` file instead. This allows
  you to use your own custom functions in addition to Capri.

- When set to `"auto"` (default), Capri will generate a worker unless a `/functions` directory is present, in which
  case a middleware will be generated instead.
