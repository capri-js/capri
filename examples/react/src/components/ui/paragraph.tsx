import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Paragraph({ children }: Props) {
  return <p>{children}</p>;
}
