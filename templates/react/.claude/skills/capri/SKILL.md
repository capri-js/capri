---
name: capri
description: Capri static site generator with island architecture. Use when creating components, pages, configuring hydration, fetching data, or working with this Capri project.
---

# Capri (React)

Capri is a static site generator with **island architecture**. Only components with `.island.tsx` suffix ship JavaScript to the browser. Everything else renders to static HTML with zero JS.

## Coming from Next.js?

- No `getStaticProps` - fetch data in `main.server.tsx` or use `useFetch` in components
- No `<Head>` component - render full documents via `prerenderToNodeStream()` or use CSS selector injection
- No API routes - this is pure static generation
- `getStaticPaths` exists but lives in `main.server.tsx`

## Coming from Astro?

- Islands use `.island.tsx` file suffix instead of `client:*` directives
- Hydration timing via `export const options = { loading: "visible" }`
- No frontmatter - use React components throughout

## Project Structure

```
├── main.tsx            # Client entry - hydrates islands
├── main.server.tsx     # SSR entry - renders static HTML, exports getStaticPaths
├── router.tsx          # File-based routing logic
├── pages/              # Page components (auto-discovered)
│   └── root.tsx        # Home page (/)
├── components/
│   ├── islands/        # Interactive components (.island.tsx)
│   └── ui/             # Static components (no JS shipped)
├── index.html          # HTML template
└── vite.config.ts      # Capri plugin config
```

## Islands (Interactive Components)

Any component with `.island.tsx` suffix becomes interactive:

```tsx
// components/islands/counter.island.tsx
import { useState } from "react";

export default function Counter({ start = 0 }) {
  const [count, setCount] = useState(start);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### Hydration Options

Control when islands hydrate by exporting an `options` object:

```tsx
export const options = {
  loading: "visible", // "eager" (default) | "idle" | "visible"
  media: "(max-width: 768px)", // Only hydrate when media query matches
};
```

- **eager**: Hydrate immediately (default)
- **idle**: Hydrate when browser is idle (requestIdleCallback)
- **visible**: Hydrate when scrolled into view (IntersectionObserver)
- **media**: Only hydrate when media query matches (e.g., mobile-only islands)

## Data Fetching

### In entry files (for CMS/API data)

Fetch data at the top level of `main.server.tsx`:

```tsx
// main.server.tsx
const posts = await fetchPosts(); // Runs once at build time

export async function getStaticPaths() {
  return ["/", ...posts.map((p) => `/blog/${p.slug}`)];
}
```

### In components (using React 19's `use()`)

```tsx
import { use } from "react";

const cache = new Map();
function fetchJson(url: string) {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url).then((r) => r.json()),
    );
  }
  return cache.get(url);
}

export function useFetch<T>(url: string): T {
  return use(fetchJson(url));
}
```

## Routing

### File-based routing

Files in `pages/` map to routes:

- `pages/root.tsx` → `/`
- `pages/about.tsx` → `/about`
- `pages/blog/post.tsx` → `/blog/post`

### Dynamic routes

Export `getStaticPaths` from `main.server.tsx`:

```tsx
export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  return ["/", "/about", ...posts.map((p) => `/blog/${p.slug}`)];
}
```

The router in `router.tsx` handles URL matching.

## Head/Meta Management

### Using prerenderToNodeStream (recommended)

React can render full HTML documents including `<head>`:

```tsx
// main.server.tsx
import { prerenderToNodeStream } from "react-dom/static";

export async function render(url: string) {
  return {
    "#app": prerenderToNodeStream(<App path={url} />),
  };
}
```

### CSS selector injection

Return an object with CSS selectors as keys:

```tsx
export async function render(url: string) {
  return {
    "#app": renderToString(<App path={url} />),
    title: getPageTitle(url),
    "meta[name=description]": { content: getPageDescription(url) },
  };
}
```

## Common Tasks

| Task                 | How                                                          |
| -------------------- | ------------------------------------------------------------ |
| Add a page           | Create `pages/name.tsx`                                      |
| Add an island        | Create `components/islands/name.island.tsx`                  |
| Add static component | Create `components/ui/name.tsx` (no `.island` suffix)        |
| Lazy-load island     | Add `export const options = { loading: "visible" }`          |
| Mobile-only island   | Add `export const options = { media: "(max-width: 768px)" }` |
| Add dynamic routes   | Export `getStaticPaths()` from `main.server.tsx`             |

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build static site (vite build && vite build --ssr)
npm run preview  # Preview production build
```

## Vite Config

```tsx
import capri from "@capri-js/react";
import react from "@vitejs/plugin-react";

export default {
  plugins: [
    react(),
    capri({
      prerender: ["/", "/about"], // Explicit paths to render
      followLinks: true, // Auto-discover by crawling links
      spa: "/preview", // Client-only SPA routes
      islandGlobPattern: "**/*.island.*",
      sitemap: { origin: "https://example.com" },
    }),
  ],
};
```

## Key Files

- `main.server.tsx` - SSR render function, `getStaticPaths`
- `main.tsx` - Client hydration entry
- `router.tsx` - URL to component mapping
- `vite.config.ts` - Build configuration
- `components/async/use-fetch.ts` - Data fetching utility
