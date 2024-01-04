declare module "virtual:capri-component" {
  import { IslandOptions } from "capri";
  import { ComponentType } from "preact";

  const value: ComponentType;
  export default value;

  export const options: IslandOptions;
}
