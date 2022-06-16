import { ComponentChildren } from "preact";

type Props = {
  href: string;
  children: ComponentChildren;
};

export function Link({ href, children }: Props) {
  return <a href={useHref(href)}>{children}</a>;
}

/**
 * NOTE: preact-router only supports root-relative URLs.
 * Since this example is deployed to a sub-directory on GitHub pages
 * we use realative URLs for our links. For the static build this is
 * not an issue but in preview mode (SPA) we have to resolve them.
 */
function useHref(href: string) {
  if (typeof window === "undefined") return href;
  return new URL(href, window.location.href).pathname;
}
