import "vite";

declare module "vite" {
  export interface UserConfig {
    ssr?: SSROptions;
  }
}
