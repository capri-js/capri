import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ServerContent({ children }: Props) {
  return <div>{children}</div>;
}
