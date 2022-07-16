import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function StaticContent({ children }: Props) {
  console.log(
    "Rendering StaticContent. This should only happen during build or in SPA mode."
  );
  return <div className="box">{children}</div>;
}
