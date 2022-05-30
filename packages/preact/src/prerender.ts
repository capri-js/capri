import { VNode } from "preact";
import { prerender as render } from "preact-iso";

export async function prerender(vnode: VNode<any>) {
  const result = await render(vnode);
  return result.html;
}
