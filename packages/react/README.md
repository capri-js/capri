# React bindings for Capri

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import capri from "@capri-js/react";

export default defineConfig({
  plugins: [react(), capri({})],
});
```
