# SolidJS bindings for Capri 🍋

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import capri from "@capri-js/solid";

export default defineConfig({
  plugins: [
    solid({
      ssr: true,
    }),
    capri(),
  ],
});
```

Visit [capri.build](https://capri.build) for docs and more information.
