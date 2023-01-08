import * as path from "path";

import * as fsutils from "./fsutils.js";
import { getEntrySrc } from "./html.js";

/**
 * Get the absolute path to index.html.
 * @param root the project root
 * @returns The absolute path
 * @throws Error, if file not found
 */
export function getIndexHtml(root = "") {
  const indexHtml = path.resolve(root, "index.html");
  if (!fsutils.exists(indexHtml)) {
    throw new Error(`Can't find index.html in ${root}`);
  }
  return indexHtml;
}

/**
 * Get the absolute path to the entry script.
 * @param root the project root
 * @returns The absolute path
 * @throws Error, if file not found
 */
export function getEntryScript(root = "") {
  const indexHtml = getIndexHtml(root);
  const src = getEntrySrc(fsutils.read(indexHtml));
  if (!src) throw new Error(`Can't find entry script in ${indexHtml}`);
  return src;
}

/**
 * Check if the given script is a .server script.
 */
function isServerEntry(file: string) {
  return /\.server\.[^.]+$/.test(file);
}

export type EntryScripts = {
  raw: string;
  server: string;
  client?: string;
};

/**
 * Get the absolute paths to the entry scripts.
 * @param root the project root
 */
export function getEntryScripts(root = ""): EntryScripts {
  const raw = getEntryScript(root);
  const resolved = path.join(path.resolve(root), raw);
  if (isServerEntry(raw)) {
    return { raw, server: resolved };
  }
  const server = resolved.replace(/(\.client)?(\.[^.]+)$/, ".server$2");
  if (!fsutils.exists(server)) {
    throw new Error(
      `File not found: ${server}. Make sure to name your server entry file accordingly.`
    );
  }
  return {
    raw,
    client: resolved,
    server,
  };
}
