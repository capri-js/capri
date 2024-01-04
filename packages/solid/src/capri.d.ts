declare module "virtual:capri-component" {
  import { IslandOptions } from "capri";
  import { JSX } from "solid-js";

  const value: (props: any) => JSX.Element;
  export default value;

  export const options: IslandOptions;
}
