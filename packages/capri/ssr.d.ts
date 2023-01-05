declare module "virtual:capri-ssr" {
  const { default: ssr } = await import("./src/virtual/ssr.js");
  export default ssr;
}

declare const __CSS_ASSETS__: string[];
