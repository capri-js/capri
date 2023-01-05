import { RenderContext, StaticRenderContext } from "capri";
import { createContext, createElement, ReactNode, useContext } from "react";
import render from "react-render-to-string";

export type { RenderFunction } from "capri";

const renderContext = createContext<RenderContext>(new StaticRenderContext());

export function renderToString(children: ReactNode, context?: RenderContext) {
  const node = context
    ? createElement(renderContext.Provider, { value: context, children })
    : children;

  return render(node);
}

export const useRenderContext = () => useContext(renderContext);

export const useStatus = (code: number) => {
  const ctx = useRenderContext();
  if (import.meta.env.SSR) {
    ctx.status(code);
  }
};
