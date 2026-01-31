import { ReactNode, useState } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};
export default function Expandable({ title, children }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="expandable box" data-expanded={expanded ? "true" : "false"}>
      <button onClick={() => setExpanded(!expanded)}>{title}</button>
      <div className="expandable-content">{children}</div>
    </div>
  );
}
