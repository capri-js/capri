import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function StaticContent({ children }: Props) {
  return <div className="box">{children}</div>;
}
