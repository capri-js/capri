import { App } from "./App.jsx";

export function Preview() {
  const url = new URL(window.location.href);
  const slug = url.searchParams.get("slug") ?? "/";
  return <App path={slug} />;
}

/**
 * Component to display a banner when the site is viewed as SPA.
 */
export function PreviewBanner() {
  return <div className="banner">Preview Mode</div>;
}
