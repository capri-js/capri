import { createSSRApp, h } from "vue";

export default function hydrate(
  component: any,
  props: Record<string, any>,
  element: Element,
) {
  const slots: any = {};
  element.querySelectorAll("capri-slot").forEach((el) => {
    const name = el.getAttribute("name")!;
    slots[name] = h("capri-slot", {
      name,
      style: "display:contents",
      innerHTML: el.innerHTML,
    });
  });
  const app = createSSRApp({
    /* name, */ render: () => h(component, props, slots),
  });
  app.mount(element.parentElement!);
}
