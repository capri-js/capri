import fs from "fs";
import path from "path";

import { escapeRegex, posixify } from "./utils.js";

/**
 * Check if a file or directory exists.
 * @returns true if the path exists, false otherwise.
 */
export function exists(file: string) {
  return fs.existsSync(file);
}

/**
 * Creates a directory and all possibly missing ancestors.
 */
export function mkdir(dir: string) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err: any) {
    if (err.code === "EEXIST") return;
    throw err;
  }
}

/**
 * Recursively deletes the given path.
 */
export function rm(path: string) {
  fs.rmSync(path, { force: true, recursive: true });
}
/**
 * Copy files.
 * @param source file or directory to copy
 * @param target destination file name or directory
 * @param opts optional filter and replacement functions
 * @returns the files that were written
 */
export function copy(
  source: string,
  target: string,
  opts: {
    filter?: (basename: string) => boolean;
    replace?: Record<string, string>;
  } = {}
) {
  if (!exists(source)) return [];

  const files: string[] = [];

  const prefix = posixify(target) + "/";

  const regex = opts.replace
    ? new RegExp(
        `(${Object.keys(opts.replace).map(escapeRegex).join("|")})`,
        "g"
      )
    : null;

  function go(from: string, to: string) {
    if (opts.filter && !opts.filter(path.basename(from))) return;

    const stats = fs.statSync(from);

    if (stats.isDirectory()) {
      fs.readdirSync(from).forEach((file) => {
        go(path.join(from, file), path.join(to, file));
      });
    } else {
      mkdir(path.dirname(to));

      if (regex && opts.replace) {
        const data = read(from);
        fs.writeFileSync(
          to,
          data.replace(regex, (match, key) => opts.replace?.[key] ?? "")
        );
      } else {
        fs.copyFileSync(from, to);
      }

      files.push(
        to === target
          ? posixify(path.basename(to))
          : posixify(to).replace(prefix, "")
      );
    }
  }

  go(source, target);

  return files;
}

/**
 * Read the contents of a UTF-8 encoded file.
 */
export function read(file: string) {
  return fs.readFileSync(file, "utf8");
}

/**
 * Write a string to a file. Missing directories are created.
 */
export function write(file: string, data: string) {
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
  } catch {
    // ignore
  }
  fs.writeFileSync(file, data);
}

function escapeRegex(str: string) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function posixify(str: string) {
  return str.split(path.sep).join(path.posix.sep);
}
