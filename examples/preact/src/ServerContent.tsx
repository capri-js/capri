import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

export function ServerContent({ children }: Props) {
  console.log(
    "Rendering ServerContent. This should only happen during build or in SPA mode."
  );
  return <div>{children}</div>;
}
