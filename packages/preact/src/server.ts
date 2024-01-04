export type { RenderFunction } from "capri";
import { VNode } from "preact";
import { prerender } from "preact-iso";

export async function renderToString(vnode: VNode) {
  const res = await prerender(vnode, { maxDepth: 1000 });
  return res.html;
}
