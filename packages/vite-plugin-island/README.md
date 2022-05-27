# vite-plugin-island

Vite plugin that provides virtual modules to support partial hydration.

## Plugin options

- **hydrate: string**: a resolvable module path pointing to a file that exports a framework specific hydration module.

- **islandGlobPattern?: string**: A glob pattern to find all island components. Defaults to `src/**/*.island.*`

## Hydration modules

To hydrate component you have to provide a module that exports a `hydrate` function. For React 18 such a module would look lie this:

```js
import { hydrateRoot } from "react-dom/client";

export function hydrate(element, container) {
  return hydrateRoot(container, element);
}
```

## Usage

Once everything is set up, you can use the plugin like this:

```tsx
import { island } from "virtual:island";

function Component() {
  return <div>The time is {new Date().toLocaleTimeString()}</div>;
}
const IslandComponent = island(Component);
```

**NOTE:** The island function will only have an effect when Vite is run in SSR mode. For regular client builds, the island function is a no-op and returns the component verbatim.

Finally, in your page's bootstrapping code, import `virtual:island-hydration` to run the hydration script.
