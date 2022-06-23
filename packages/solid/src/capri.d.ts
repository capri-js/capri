declare module "virtual:capri-component" {
  import { JSX } from "solid-js";
  import { IslandOptions } from "capri";

  const value: (props: any) => JSX.Element;
  export default value;

  export const options: IslandOptions;
}
