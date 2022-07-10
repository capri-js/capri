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
      target: cloudflare(),
    }),
  ],
});
```

Visit [capri.build](https://capri.build) for docs and more information.
