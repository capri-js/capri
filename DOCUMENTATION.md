# Capri Documentation

## Introduction

Capri is a static site generator for React and Preact that leverages the island architecture pattern. It allows you to build static websites with interactive components ("islands") that are hydrated on the client, while keeping the rest of the page as static HTML for optimal performance and minimal JavaScript.

## Key Features

- **Island Architecture**: Only interactive components are hydrated, keeping page weight minimal.
- **Framework Agnostic**: Uses standard React/Preact components without custom component formats.
- **TypeScript Support**: Built with TypeScript for type safety and better developer experience.
- **Full Static Rendering**: Server-renders your entire site during build.
- **Intelligent Hydration Strategies**: Load islands eagerly, when visible, or during idle time.
- **Media Query Support**: Conditionally hydrate islands based on viewport size.
- **Built on Vite**: Leverages Vite for fast development and optimized builds.
- **Automatic Sitemap Generation**: Creates a sitemap for your static site.
- **Static Path Generation**: Define static paths with `getStaticPaths()` export.

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

### Setup

Configure Vite to use the Capri plugin in your `vite.config.ts`:

```typescript
// For React
import capri from "@capri-js/react";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    capri({
      sitemap: {
        origin: "https://example.com",
      },
    }),
  ],
});

// For Preact
import capri from "@capri-js/preact";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    preact(),
    capri({
      sitemap: {
        origin: "https://example.com",
      },
    }),
  ],
});
```

### Project Structure

A typical Capri project has the following structure:

```
my-site/
├── index.html
├── package.json
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── Counter.island.tsx    # Interactive island component
│   │   └── Button.tsx            # Static component
│   ├── main.css
│   ├── main.server.tsx           # Server entry for static rendering
│   ├── main.tsx                  # Client entry for hydration
│   └── pages/
│       ├── Home.tsx
│       └── About.tsx
├── tsconfig.json
└── vite.config.ts
```

### Development Commands

```bash
# Start development server
npm run dev

# Build the site
npm run build

# Preview the built site
npm run preview
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
   import "./main.css";
   import { StrictMode } from "react";
   import ReactDOM from "react-dom/client";
   import { App } from "./App.jsx";

   ReactDOM.createRoot(document.getElementById("app")!).render(
     <StrictMode>
       <App path={window.location.pathname} />
     </StrictMode>,
   );
   ```

2. **Server Entry (`main.server.tsx`)**:

   ```tsx
   import "./main.css";
   import { StrictMode } from "react";
   import { prerenderToNodeStream } from "react-dom/static";
   import { App } from "./App.jsx";

   export async function render(url: string) {
     const root = (
       <StrictMode>
         <App path={url} />
       </StrictMode>
     );
     return {
       "#app": prerenderToNodeStream(root),
     };
   }
   ```

### Routing

Capri uses static routing. Your `App.tsx` component should handle routing based on the provided `path` prop:

```tsx
export function App({ path }: { path: string }) {
  if (path === "/") {
    return <Home />;
  } else if (path === "/about") {
    return <About />;
  } else {
    throw new Error("Not found");
  }
}
```

### Creating Islands

Islands are regular React/Preact components with a `.island.tsx` file extension:

```tsx
// Counter.island.tsx
import { useState } from "react";

type Props = {
  start?: number;
};

export default function Counter({ start = 0 }: Props) {
  const [counter, setCounter] = useState(start);
  return (
    <div className="counter">
      <button onClick={() => setCounter((c) => c - 1)}>-</button>
      <span>{counter}</span>
      <button onClick={() => setCounter((c) => c + 1)}>+</button>
    </div>
  );
}
```

### Using Islands

Use islands like any other component in your app:

```tsx
import CounterIsland from "./Counter.island.jsx";

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
// Visible.island.tsx
import { useState, useEffect } from "react";

// Only hydrate when the island becomes visible
export const options = {
  loading: "visible",
};

export default function VisibleIsland() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div>
      <p>This island only hydrates when visible in the viewport.</p>
      <p>Status: {hydrated ? "Hydrated ✅" : "Not hydrated ⏳"}</p>
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
// MediaQuery.island.tsx
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

### Best Practices

1. **Minimize Islands**: Use islands only for interactive parts of your UI.
2. **Use Appropriate Loading Strategies**: Use "visible" for below-the-fold content.
3. **Strategic Media Queries**: Only hydrate components when needed based on viewport.
4. **Keep Islands Small**: Each island should have a single responsibility.
5. **Static Props**: Pass static data as props to islands to avoid additional client-side fetching.

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

## Examples

Explore the provided examples to learn more about Capri's features:

- Basic counter island
- Expandable content with children
- Lazy-loading islands with visibility detection
- Media query conditional hydration
- Data fetching with React's use hook

## Troubleshooting

### Common Issues

1. **Missing Server Entry**: Ensure you have a `main.server.tsx` file with an exported `render` function.
2. **Island Not Hydrating**: Check that the file has the `.island.tsx` extension and is properly exported.
3. **Build Errors**: Make sure you're running `vite build && vite build --ssr` for the full build process.
4. **Import Issues**: Use `.jsx` extensions in import statements even for TypeScript files.

## Migration from Capri 5.x

Capri 6.0 focuses exclusively on React and Preact, dropping support for Vue, Svelte, and SolidJS. Key migration steps:

1. Update dependencies to the 6.x versions
2. Switch to React or Preact if you were using another framework
3. Update your Vite configuration to use the new plugin format
4. Replace any custom SSR adapters with standard static hosting

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
