import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

export function ServerContent({ children }: Props) {
  return <div>{children}</div>;
}
