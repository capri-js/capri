import { RenderContext, StaticRenderContext } from "capri/context";
import { createContext, createElement, ReactElement, useContext } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export type { RenderContext, RenderFunction } from "capri";

const renderContext = createContext<RenderContext>(new StaticRenderContext());

export function renderToString(
  children: ReactElement,
  context?: RenderContext
) {
  const node = context
    ? createElement(renderContext.Provider, { value: context, children })
    : children;

  return renderToStaticMarkup(node);
}

export const useRenderContext = () => useContext(renderContext);

export const useStatus = (code: number) => {
  const ctx = useRenderContext();
  if (import.meta.env.SSR) {
    ctx.status(code);
  }
};
