import { detach, insert, noop } from "svelte/internal";

export default function hydrate(
  Component: any,
  props: object,
  element: Element,
) {
  const $$slots: any = {};
  element.querySelectorAll("capri-slot").forEach((el) => {
    const name = el.getAttribute("name")!;
    $$slots[name] = [
      () => ({
        c: noop,
        m(target: Element, anchor: any) {
          insert(target, el, anchor);
        },
        l: noop,
        p: noop,
        d(detaching: any) {
          if (detaching) detach(el);
        },
      }),
    ];
  });
  new Component({
    target: element.parentNode,
    props: {
      ...props,
      $$scope: { ctx: {} },
      $$slots,
    },
    hydrate: true,
  });
}
