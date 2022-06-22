# Svelte bindings for Capri 🍋

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import capri from "@capri-js/svelte/vite-plugin";

export default defineConfig({
  plugins: [svelte(), capri()],
});
```

Visit [capri.build](https://capri.build) for docs and more information.
