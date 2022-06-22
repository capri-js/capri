import { createSignal } from "solid-js";

import StaticContent from "./StaticContent.lagoon.jsx";

type Props = {
  title: string;
  children?: any;
};

export default function Expandable({ title, children }: Props) {
  const [expanded, setExpanded] = createSignal(false);
  return (
    <div class="expandable box" data-expanded={expanded() ? "true" : "false"}>
      <StaticContent>
        This is static content inside an island. We call this a lagoon.
      </StaticContent>
      <button onClick={() => setExpanded((expanded) => !expanded)}>
        {title}
      </button>
      <div class="expandable-content">
        <StaticContent>
          This a second lagoon. Below you see the children that were passed to
          the Expandable island:
        </StaticContent>
        {children}
      </div>
    </div>
  );
}
