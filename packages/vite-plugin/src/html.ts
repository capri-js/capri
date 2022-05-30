import { Parser } from "htmlparser2";

export function getLinks(html: string) {
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

export function getEntrySrc(html: string) {
  let entry: string | undefined;
  const parser = new Parser({
    onopentag(name, attributes) {
      if (name === "script" && attributes.type === "module" && attributes.src) {
        const { src } = attributes;
        const external = /^(https?:)?\/\//.test(src);
        if (!entry && !external) {
          entry = src;
        }
      }
    },
  });
  parser.write(html);
  parser.end();
  return entry;
}
