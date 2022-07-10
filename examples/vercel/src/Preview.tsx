import { Navigate } from "react-router-dom";

/**
 * Handle preview requests like `/preview?slug=/about` by redirecting
 * to the given slug parameter.
 */
export function Preview() {
  const url = new URL(window.location.href);
  const slug = url.searchParams.get("slug") ?? "/";
  return <Navigate to={slug} />;
}

/**
 * Component to display a banner when the site is viewed as SPA.
 */
export function PreviewBanner() {
  return <div className="banner">Preview Mode</div>;
}
