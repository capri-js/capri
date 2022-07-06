# Capri 🍋 SSR on Vercel

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
        isg: { expiration: 60 },
      }),
    }),
  ],
});
```

Visit [capri.build](https://capri.build) for docs and more information.
