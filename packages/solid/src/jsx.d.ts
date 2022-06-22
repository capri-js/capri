import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "capri-island": JSX.IntrinsicElements["div"];
      "capri-children": JSX.IntrinsicElements["div"];
      "capri-lagoon": JSX.IntrinsicElements["div"];
    }
  }
}
