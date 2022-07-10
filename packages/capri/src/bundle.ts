import esbuild, { BuildOptions, Plugin } from "esbuild";

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
