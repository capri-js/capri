import { builtinModules } from "module";
import { OutputOptions, Plugin, rollup } from "rollup";

export function createBundler(ssrBundle: string) {
  return async function bundle(
    input: string,
    output: string,
    options: OutputOptions = {}
  ) {
    const plugins: Plugin[] = [
      {
        name: "capri-resolve",
        resolveId(source) {
          if (source === "virtual:capri-ssr") {
            return ssrBundle;
          }
        },
      },
    ];
    const b = await rollup({
      external: builtinModules,
      ...options,
      input,
      plugins,
    });
    await b.write({
      ...options,
      file: output,
    });
  };
}
