import micromatch from "micromatch";
import type { PartialResolvedId } from "rollup";
import { Plugin } from "vite";

import * as fsutils from "./fsutils.js";
import { addUnwrapped } from "./utils.js";

export type WrapperInjectionHook = "onLoad" | "onTransform";

/**
 * Plugin to load the wrapper code. Depending on the UI framework, this
 * needs to happen inside the `load` or the `transform` hook.
 */
export function injectWrapperPlugin(
  hook: WrapperInjectionHook = "onLoad"
): Plugin {
  let ssrBuild = false;
  if (hook === "onLoad") {
    return {
      name: "capri-load",
      config(cfg) {
        ssrBuild = !!cfg.build?.ssr;
      },
      load(id, options) {
        const info = this.getModuleInfo(id);
        if (isWrapperInfo(info)) {
          return loadWrapper(info.meta, options?.ssr ?? ssrBuild);
        }
      },
    };
  }
  return {
    name: "capri-transform",
    enforce: "post",
    config(cfg) {
      ssrBuild = !!cfg.build?.ssr;
    },
    transform(code, id, options) {
      const info = this.getModuleInfo(id);
      if (isWrapperInfo(info)) {
        const code = loadWrapper(info.meta, options?.ssr ?? ssrBuild);
        if (code) {
          return {
            code,
            map: {
              mappings: "",
            },
          };
        }
      }
    },
  };
}

/**
 * Load the wrapper as requested in the meta data.
 * In the wrapper code, two replacements are applied:
 *
 * - "virtual:capri-component" -> the wrapped module + "?unwrapped"
 * - "%COMPONENT_ID%" -> the Id of the wrapped component (relative to the root)
 */
function loadWrapper(meta: WrapperMeta, server: boolean) {
  const { wrapper, wrapped, componentId } = meta;

  const unwrappedId = addUnwrapped(wrapped);

  const wrapperFile = wrapper[server ? "server" : "client"];
  if (wrapperFile) {
    const code = fsutils.read(wrapperFile);
    return code
      .replace(/virtual:capri-component/g, unwrappedId)
      .replace(/%COMPONENT_ID%/g, componentId);
  }
}

/**
 * Test if id matches the given pattern and set the meta data accordingly.
 */
export function resolveWrapper(
  id: string,
  rootDir: string,
  pattern: string,
  wrapper: Wrapper
): ResolvedWrapperId | undefined {
  // Exclude sources that contain "?", e.g. vue styles and setup scripts
  if (!id.includes("?") && micromatch.contains(id, pattern)) {
    const componentId = id.startsWith(rootDir) ? id.slice(rootDir.length) : id;
    return {
      id,
      meta: { wrapper, wrapped: id, componentId },
    };
  }
}

export interface Wrapper {
  server?: string;
  client?: string;
}

type ResolvedWrapperId = PartialResolvedId & WrapperInfo;

interface WrapperMeta {
  wrapper: Wrapper;
  wrapped: string;
  componentId: string;
}

interface MetaInfo {
  meta: object;
}

interface WrapperInfo extends MetaInfo {
  meta: WrapperMeta;
}

function isMetaInfo(obj: unknown): obj is MetaInfo {
  return !!obj && typeof obj === "object" && "meta" in obj;
}

function isWrapperInfo(obj: unknown): obj is WrapperInfo {
  if (isMetaInfo(obj)) {
    const { meta } = obj;
    return (
      !!meta &&
      typeof meta === "object" &&
      "wrapper" in meta &&
      "wrapped" in meta &&
      "componentId" in meta
    );
  }
  return false;
}
