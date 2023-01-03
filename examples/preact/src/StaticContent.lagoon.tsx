import { ComponentChildren } from "preact";

type Props = {
  children?: ComponentChildren;
};

export default function StaticContent({ children }: Props) {
  return <div class="box">{children}</div>;
}
