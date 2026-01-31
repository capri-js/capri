# ![Capri](logo.svg)

## Introduction

Capri is a static site generator for React and Preact that leverages the _island architecture_ pattern. It allows you to build static websites with interactive components ("islands") that are hydrated on the client, while keeping the rest of the page as static HTML for optimal performance and minimal JavaScript.

## Key Features

- **Island Architecture**: Only interactive components are hydrated, keeping page weight minimal.
- **Framework Agnostic**: Uses standard React/Preact components without custom component formats.
- **Full Static Rendering**: Server-renders your entire site during build.
- **Intelligent Hydration Strategies**: Load islands eagerly, when visible, or during idle time.
- **Media Query Support**: Conditionally hydrate islands based on viewport size.
- **Built on Vite**: Leverages Vite for fast development and optimized builds.
- **Automatic Sitemap Generation**: Creates a sitemap for your static site.

## Getting Started

### Installation

Create a new Capri project using the create command:

```bash
# For React
npm create capri@latest my-site --template react

# For Preact
npm create capri@latest my-site --template preact
```

Or add Capri to an existing project:

```bash
# For React
npm install @capri-js/react --save-dev

# For Preact
npm install @capri-js/preact --save-dev
```

Configure Vite to use the Capri plugin in your `vite.config.ts`:

```typescript
// For React
import capri from "@capri-js/react";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), capri()],
});

// For Preact
import capri from "@capri-js/preact";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [preact(), capri()],
});
```

### Project Structure

A typical Capri project has the following structure:

```
my-site/
├── index.html
├── package.json
├── src/
│   ├── components/
│   │   ├── counter.island.tsx    # Interactive island component
│   │   └── button.tsx            # Static component
│   ├── main.css
│   ├── main.server.tsx           # Server entry for static rendering
│   ├── main.tsx                  # Client entry for hydration
│   ├── router.tsx
│   └── pages/
│       └── root.tsx
├── tsconfig.json
└── vite.config.ts
```

## Core Concepts

### Island Architecture

Capri follows the island architecture pattern, where only interactive components are hydrated on the client. This results in faster page loads and less JavaScript to parse and execute.

Islands are regular React/Preact components with a special file naming convention:

```
Component.island.tsx
```

### Entry Points

Capri requires two entry points:

1. **Client Entry (`main.tsx`)**:

   ```tsx
   import { StrictMode } from "react";
   import ReactDOM from "react-dom/client";
   import { Router } from "./router.jsx";

   ReactDOM.createRoot(document.body).render(
     <StrictMode>
       <Router path={window.location.pathname} />
     </StrictMode>,
   );
   ```

2. **Server Entry (`main.server.tsx`)**:

   ```tsx
   import { StrictMode } from "react";
   import { prerenderToNodeStream } from "react-dom/static";
   import { Router } from "./router.jsx";

   export async function render(url: string) {
     const root = (
       <StrictMode>
         <Router path={url} />
       </StrictMode>
     );
     return {
       body: prerenderToNodeStream(root),
     };
   }
   ```

### Routing

Your `Router` component should handle routing based on the provided `path` prop. A very simple implementation would look like this:

```tsx
export function Router({ path }: { path: string }) {
  if (path === "/") {
    return <Home />;
  } else if (path === "/about") {
    return <About />;
  } else {
    throw new Error("Not found");
  }
}
```

Check out the provided templates for a simple file-system based approach.

If you are using a CMS you won't need a router at all. Instead fetch the content for the given `path` from the CMS and render it.

### Creating Islands

Islands are regular React/Preact components with a `.island.tsx` file extension:

```tsx
// counter.island.tsx
import { useState } from "react";

type Props = {
  start?: number;
};

export default function Counter({ start = 0 }: Props) {
  const [counter, setCounter] = useState(start);
  return (
    <div className="counter">
      <span>{counter}</span>
      <button onClick={() => setCounter((c) => c - 1)}>-</button>
    </div>
  );
}
```

### Using Islands

Use islands like any other component in your app:

```tsx
import CounterIsland from "./counter.island.jsx";

export function Home() {
  return (
    <main>
      <h1>Welcome to Capri</h1>
      <p>This is a static paragraph</p>
      <CounterIsland start={10} />
    </main>
  );
}
```

### Island Loading Strategies

Islands can use different loading strategies by exporting an `options` object:

```tsx
// visible.island.tsx
import { useState, useEffect } from "react";

// Only hydrate when the island becomes visible
export const options = {
  loading: "visible",
};

export default function VisibleIsland() {
  return (
    <div>
      <p>This island only hydrates when visible in the viewport.</p>
    </div>
  );
}
```

Available loading strategies:

- `eager`: Hydrate immediately (default)
- `idle`: Hydrate when the browser is idle
- `visible`: Hydrate when the island enters the viewport

### Media Queries

Islands can be conditionally hydrated based on viewport size using the `media` option:

```tsx
// media-query.island.tsx
export const options = {
  media: "(max-width: 768px)",
};

export default function MediaQueryIsland() {
  return (
    <div>
      <p>This island only hydrates on mobile devices.</p>
    </div>
  );
}
```

### Data Fetching

Capri supports React's `use` hook for data fetching during static rendering:

```tsx
// useFetch.tsx
import { use } from "react";

const promises = new Map();

export function fetchJson(url: string) {
  let promise = promises.get(url);
  if (!promise) {
    promise = fetch(url).then((res) => res.json());
    promises.set(url, promise);
  }
  return promise;
}

export function useFetch<T>(url: string): T {
  return use(fetchJson(url));
}
```

Use the hook in your components:

```tsx
import { useFetch } from "./useFetch.tsx";

type Data = {
  title: string;
  description: string;
};

export function Post() {
  const data = useFetch<Data>("https://api.example.com/post/1");

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </article>
  );
}
```

### Static Paths

You can define static paths for your site by exporting a `getStaticPaths` function from your server entry file:

```tsx
// main.server.tsx
export function getStaticPaths() {
  return ["/", "/about", "/blog/post-1", "/blog/post-2"];
}

export async function render(url: string) {
  // ... render function
}
```

## Advanced Configuration

### Capri Plugin Options

```typescript
capri({
  // Whether to create index.html files for paths
  createIndexFiles: false,

  // What paths to pre-render (string, array, function, or false)
  prerender: "/",

  // Whether to follow links during pre-rendering to discover pages
  followLinks: true,

  // Pattern to identify island components
  islandGlobPattern: "/src/**/*.island.*",

  // Path for SPA mode (for previews)
  spa: "/preview",

  // Whether to use CommonJS format for the SSR build
  commonJs: false,

  // Whether to inline CSS into HTML
  inlineCss: false,

  // Sitemap configuration
  sitemap: {
    origin: "https://example.com",
  },
});
```

### Advanced Routing with getStaticPaths

For more complex scenarios, you can dynamically generate paths:

```tsx
// main.server.tsx
export async function getStaticPaths() {
  // Fetch data from an API or CMS
  const posts = await fetch("https://api.example.com/posts").then((r) =>
    r.json(),
  );

  // Create paths for each post
  const postPaths = posts.map((post) => `/blog/${post.slug}`);

  // Include standard pages
  return ["/", "/about", ...postPaths];
}
```

## Performance Optimization

### Combined Loading Strategies

You can combine loading strategies with media queries:

```tsx
// VisibleMedia.island.tsx
export const options = {
  loading: "visible",
  media: "(max-width: 1000px)",
};

export default function VisibleMediaIsland() {
  return (
    <div>
      <p>This island only hydrates when visible AND on mobile devices.</p>
    </div>
  );
}
```

## Deployment

Capri generates static HTML, CSS, and JavaScript files that can be hosted on any static hosting platform:

```bash
# Build your site
npm run build

# The output will be in the dist/ directory
```

Deploy the `dist` directory to platforms like:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static file server

## API Reference

### Island Options

```typescript
interface IslandOptions {
  /**
   * Media query that must match for the island to be hydrated
   */
  media?: string;

  /**
   * Loading strategy for the island
   * - 'eager': Hydrate immediately (default)
   * - 'idle': Hydrate when the browser is idle
   * - 'visible': Hydrate when the island enters the viewport
   */
  loading?: "eager" | "idle" | "visible";
}
```

### Capri Plugin Options

```typescript
interface CapriPluginOptions {
  createIndexFiles?: boolean;
  prerender?: PrerenderConfig;
  followLinks?: boolean | ((pathname: string) => boolean);
  islandGlobPattern?: string;
  adapter?: Adapter;
  spa?: string | false;
  commonJs?: boolean;
  inlineCss?: boolean;
  sitemap?: SitemapOptions | false;
}

type PrerenderConfig = false | string | string[] | GetStaticPathsFunction;

type GetStaticPathsFunction = () => string[] | Promise<string[]>;

interface SitemapOptions {
  origin: string;
  lastmod?: Date | string;
  changefreq?: string;
  priority?: number;
}
```

## Contributing

Contributions to Capri are welcome! Please refer to the GitHub repository at [https://github.com/capri-js/capri](https://github.com/capri-js/capri) for more information on how to contribute.

## License

Capri is licensed under the MIT License.
