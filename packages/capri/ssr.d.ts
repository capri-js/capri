declare module "virtual:capri-ssr" {
  import { RenderContext } from "./src/types.js";
  export default function (
    url: string,
    context: RenderContext
  ): Promise<string>;
}

declare const USE_CHEERIO: boolean;
