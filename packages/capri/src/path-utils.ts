import path from "path";

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

export function stripSlashes(s: string) {
  return s.replace(/^\/*(.+?)\/*$/, "$1");
}

export function urlToFileName(
  url: string,
  createIndexFiles = false,
  base = "",
) {
  if (base && url.startsWith(base)) {
    url = url.slice(base.length);
  }
  const file = stripSlashes(url);
  if (!file) return "index.html";
  if (file.match(/.+\.\w+$/)) return file;
  return `${file}${createIndexFiles ? "/index.html" : ".html"}`;
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
