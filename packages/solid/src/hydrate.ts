import { Component } from "solid-js";
import { hydrate as solidHydrate } from "solid-js/web";

export function hydrate(component: Component, props: object, element: Element) {
  const key = element.getAttribute("data-hk");
  if (!key) {
    throw new Error("Can't hydrate an element without a data-hk attribute.");
  }
  solidHydrate(() => component(props), element.parentElement!, {
    renderId: key.slice(0, -1),
  });
}
