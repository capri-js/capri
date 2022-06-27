import { ComponentChildren } from "preact";

type Props = {
  children?: ComponentChildren;
};

export default function StaticContent({ children }: Props) {
  console.log(
    "Rendering StaticContent. This should only happen during build or in SPA mode."
  );
  return <div class="box">{children}</div>;
}
