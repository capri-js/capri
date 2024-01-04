import type { JSX } from "solid-js";
import { hydrate as solidHydrate } from "solid-js/web";

export default function hydrate(
  component: (props: any) => JSX.Element,
  props: Record<string, unknown>,
  element: Element,
) {
  const key = element.getAttribute("data-hk");
  if (!key) {
    throw new Error("Can't hydrate an element without a data-hk attribute.");
  }

  const children = element.querySelector("capri-children");
  if (children) {
    //TODO Must this be styled?
    props.children = (
      <capri-children style={{ display: "contents" }} innerHTML="" />
    );
  }

  const renderId = key.slice(0, -1);
  solidHydrate(() => component(props), element.parentElement!, { renderId });
}
