import { route } from "@capri-js/preact-router";
import { useEffect } from "preact/hooks";

/**
 * Handle preview requests like `/preview?slug=/about` by redirecting
 * to the given slug parameter.
 */
export function Preview() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const slug = url.searchParams.get("slug") ?? "/";
    route(slug);
  });
  return null;
}

/**
 * Component to display a banner when the site is viewed as SPA.
 */
export function PreviewBanner() {
  return <div class="banner">Preview Mode</div>;
}
