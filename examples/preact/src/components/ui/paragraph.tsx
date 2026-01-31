import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

export function Paragraph({ children }: Props) {
  return <p>{children}</p>;
}
