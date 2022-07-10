import esbuild, { BuildOptions, Plugin } from "esbuild";

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
    options?: BuildOptions
  ) {
    await esbuild.build({
      target: "es2020",
      platform: "browser",
      plugins: [resolve],
      entryPoints: [input],
      outfile: output,
      allowOverwrite: true,
      legalComments: "none",
      format: "esm",
      bundle: true,
      minify: true,
      ...options,
    });
  };
}
