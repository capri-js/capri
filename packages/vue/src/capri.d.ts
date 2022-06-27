declare module "virtual:capri-component" {
  import { IslandOptions } from "capri";
  import { ComponentType } from "react";

  const value: ComponentType<any>;
  export default value;

  export const options: IslandOptions;
}
