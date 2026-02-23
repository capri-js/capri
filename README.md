# ![Capri](logo.svg)

Capri is a static site generator for React and Preact that uses island architecture: only interactive components hydrate, everything else ships as static HTML.

## Why Capri

- **React/Preact everywhere**: Pages and islands are standard components. No custom syntax.
- **Islands by convention**: Add `.island.tsx` to opt into hydration.
- **Static-first**: Render at build time and deploy to any static host.
- **Vite-native**: Fast dev server, predictable builds, easy integration.

## Quick Start

```bash
# React
npm create capri@latest my-site --template react

# Preact
npm create capri@latest my-site --template preact
```

## Core Concepts

### Islands

Components **without** `.island.tsx` render to static HTML and ship **zero JavaScript**. Components **with** `.island.tsx` hydrate on the client.

```tsx
// Counter.island.tsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### Entry Points

Capri uses two entry files for a clean split between static rendering and client-side previews. The server entry builds static HTML at build time. The client entry is used in dev mode and, when connected to a CMS, enables live previews (and even in-place editing) without a server-side rendering round-trip. Previews render in the browser from the same static output.

```tsx
// main.tsx
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router.jsx";

ReactDOM.createRoot(document.body).render(
  <StrictMode>
    <Router path={window.location.pathname} />
  </StrictMode>,
);
```

```tsx
// main.server.tsx
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { Router } from "./router.jsx";

export async function render(url: string) {
  return {
    body: prerenderToNodeStream(
      <StrictMode>
        <Router path={url} />
      </StrictMode>,
    ),
  };
}
```

### Routing

Your `Router` decides what to render based on the `path` prop:

```tsx
export function Router({ path }: { path: string }) {
  if (path === "/") return <Home />;
  if (path === "/about") return <About />;
  throw new Error("Not found");
}
```

A simple file-based router using `import.meta.glob()`:

```tsx
const modules = import.meta.glob("./pages/**/*.tsx", { eager: true });

export function Router({ path }: { path: string }) {
  const normalizedPath = path === "/" ? "/root" : path;
  const module = modules[`./pages${normalizedPath}.tsx`];
  if (!module) throw new Error(`Page not found: ${path}`);
  const Page = module.default;
  return <Page />;
}
```

### Island Loading Strategies

```tsx
// Visible.island.tsx
export const options = {
  loading: "visible",
};
```

- `eager` (default): hydrate immediately
- `idle`: hydrate when the browser is idle
- `visible`: hydrate when the island enters the viewport

### Media Queries

```tsx
// MediaQuery.island.tsx
export const options = {
  media: "(max-width: 768px)",
};
```

## Data Fetching

### Entry-level (recommended for CMS/API data)

```tsx
// main.server.tsx
const posts = await fetchPosts();

export async function getStaticPaths() {
  return ["/", ...posts.map((p) => `/blog/${p.slug}`)];
}

export async function render(url: string) {
  const post = posts.find((p) => `/blog/${p.slug}` === url);
  return {
    body: renderPost(post),
  };
}
```

### React `use()` during static rendering

```tsx
import { use } from "react";

const cache = new Map();

export function useFetch<T>(url: string): T {
  let promise = cache.get(url);
  if (!promise) {
    promise = fetch(url).then((res) => res.json());
    cache.set(url, promise);
  }
  return use(promise);
}
```

## Static Paths

```tsx
// main.server.tsx
export function getStaticPaths() {
  return ["/", "/about", "/blog/post-1", "/blog/post-2"];
}
```

## Configuration

```ts
capri({
  prerender: "/",
  followLinks: true,
  islandGlobPattern: "/src/**/*.island.*",
  spa: "/preview",
  inlineCss: false,
  sitemap: {
    origin: "https://example.com",
  },
});
```

## Deployment

```bash
npm run build
```

This runs two Vite builds: a client bundle for island hydration and an SSR build for static HTML generation. Deploy the `dist` directory to any static host.

## Contributing

Contributions are welcome. See the GitHub repository for details.

## License

MIT
