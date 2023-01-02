declare module "virtual:capri-ssr" {
  type RenderContext = {
    getHeader(name: string): string | null;
    setHeader(name: string, value: string): void;
  };
  export default function (
    url: string,
    context: RenderContext
  ): Promise<string>;
}

declare const __CSS_ASSETS__: string[];
