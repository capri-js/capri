import { ComponentProps } from "preact";

let base = import.meta.env.BASE_URL || "";

export function Link({ children, href, ...props }: ComponentProps<"a">) {
  if (base.endsWith("/")) base = base.slice(0, -1);
  return (
    <a href={`${base}${href}`} {...props}>
      {children}
    </a>
  );
}
