declare module "virtual:capri-component" {
  import { ComponentType } from "preact";
  import { IslandOptions } from "capri";

  const value: ComponentType;
  export default value;

  export const options: IslandOptions;
}
