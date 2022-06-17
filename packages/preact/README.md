# Preact bindings for Capri 🍋

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import preact from "@preact/preset-vite/vite-plugin";
import capri from "@capri-js/preact";

export default defineConfig({
  plugins: [preact(), capri()],
});
```

Visit [capri.build](https://capri.build) for docs and more information.
