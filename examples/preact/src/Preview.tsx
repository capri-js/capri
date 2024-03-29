import { Redirect } from "wouter-preact";

/**
 * Handle preview requests like `/preview?slug=/about` by redirecting
 * to the given slug parameter.
 */
export function Preview() {
  const url = new URL(window.location.href);
  const slug = url.searchParams.get("slug") ?? "/";
  return <Redirect to={slug} />;
}

/**
 * Component to display a banner when the site is viewed as SPA.
 */
export function PreviewBanner() {
  return <div class="banner">Preview Mode</div>;
}
