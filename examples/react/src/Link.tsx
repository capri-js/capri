import { ComponentProps } from "react";

export function Link({ children, href, ...props }: ComponentProps<"a">) {
  let base = process.env.BASE_URL || "";
  if (base.endsWith("/")) base = base.slice(0, -1);
  return (
    <a href={`${base}${href}`} {...props}>
      {children}
    </a>
  );
}
