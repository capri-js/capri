import path from "path";

export function escapeRegex(str: string) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

export function posixify(str: string) {
  return str.split(path.sep).join(path.posix.sep);
}

export function isLocalUrl(href: string) {
  const url = new URL(href, "file:///");
  return url.protocol === "file:" && !url.host;
}

export function resolveUrl(href: string) {
  const url = new URL(href, "file:///");
  return url.pathname;
}

export function stripLeadingSlash(s: string) {
  return s.replace(/^\//, "");
}

export function stripTrailingSlash(s: string) {
  return s.replace(/\/$/, "");
}

export function direct(s: string) {
  const i = s.indexOf("?");
  if (i === -1) return s + "?direct";
  if (s.slice(i).match(/[?&]direct\b/)) return s;
  return s.replace("?", "?direct&");
}

export function addUnwrapped(s: string) {
  // Note: we add the basename so that the extension stays the same...
  return `${s}?unwrapped=${path.basename(s)}`;
}
