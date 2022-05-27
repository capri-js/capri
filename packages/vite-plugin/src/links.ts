import { Parser } from "htmlparser2";

export function findLinks(html: string) {
  const links = new Set<string>();
  const parser = new Parser({
    onopentag(name, attributes) {
      if (
        name === "a" &&
        attributes.href &&
        (!attributes.target || attributes.target === "_self")
      ) {
        links.add(attributes.href);
      }
    },
  });
  parser.write(html);
  parser.end();
  return [...links];
}
