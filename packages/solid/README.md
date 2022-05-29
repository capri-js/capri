# SolidJS bindings for Capri 🍋

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import capri from "@capri-js/solid";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solid({
      ssr: true,
    }),
    capri({}),
  ],
});
```
