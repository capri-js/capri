import { prerender as render } from "preact-iso";
import { VNode } from "preact";

export async function prerender(vnode: VNode<any>) {
  const result = await render(vnode);
  return result.html;
}
