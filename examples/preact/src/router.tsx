import "./global.css";

import type { ComponentType } from "preact";

/**
 * This is a super simple router that looks up pages based on their location
 * in the file system. It uses Vite's glob imports to look for all files that
 * match the pattern `./pages/**.tsx`.
 */

// All files in the `pages` directory keyed by their file name:
const pages = import.meta.glob<{ default: ComponentType }>("./pages/**.tsx", {
  eager: true,
});

// Support for a path prefix, aka. BASE_URL so we can deploy the examples
// to a sub-directory on GitHub pages:
const base = import.meta.env.BASE_URL || "/";

/**
 * Helper that checks if a file path matches the given URL path.
 * Make sure this matches the glob pattern.
 */
function match(file: string, path: string) {
  if (path.startsWith(base)) {
    path = path.slice(base.length);
  }
  return file.replace(/\broot\b/, "") === `./pages/${path}.tsx`;
}

export function Router({ path }: { path: string }) {
  const page = Object.keys(pages).find((file) => match(file, path));
  if (!page) {
    throw new Error("Not found");
  }
  const Page = pages[page].default;
  return <Page />;
}
