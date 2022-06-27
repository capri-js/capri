import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ServerContent({ children }: Props) {
  console.log(
    "Rendering ServerContent. This should only happen during build or in SPA mode."
  );
  return <div>{children}</div>;
}
