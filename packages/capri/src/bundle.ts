import esbuild, { Plugin } from "esbuild";

export interface BundleOptions {
  target?: string;
  platform?: "browser" | "node" | "neutral";
  format?: "iife" | "cjs" | "esm";
  minify?: boolean;
  inject?: string[];
}

/**
 * Creates a bundle() function that can be used by build targets
 * to package the SSR code together with some platform specific
 * adapter logic.
 */
export function createBundler(ssrBundle: string) {
  const resolve: Plugin = {
    name: "capri-resolve",
    setup(build) {
      build.onResolve({ filter: /^virtual:capri-ssr$/ }, () => {
        return { path: ssrBundle };
      });
    },
  };

  return async function bundle(
    input: string,
    output: string,
    options: BundleOptions = {}
  ) {
    const {
      target = "es2020",
      format = "esm",
      platform = "neutral",
      minify = true,
      inject,
    } = options;
    await esbuild.build({
      target,
      format,
      platform,
      plugins: [resolve],
      entryPoints: [input],
      inject,
      outfile: output,
      allowOverwrite: true,
      legalComments: "none",
      bundle: true,
      minify,
    });
  };
}
