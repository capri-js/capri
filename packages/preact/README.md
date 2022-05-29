# Preact bindings for Capri

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import capri from "@capri-js/preact";

export default defineConfig({
  plugins: [preact(), capri()],
});
```
