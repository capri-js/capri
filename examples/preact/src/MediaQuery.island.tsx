import { useEffect, useState } from "preact/hooks";

export const options = {
  media: "(max-width:500px)",
};

export default function MediaQuery() {
  const [content, setContent] = useState(
    "Resize your browser below 500px to hydrate this island."
  );
  useEffect(() => {
    setContent("The island has been hydrated.");
  }, []);
  return <div className="box">{content}</div>;
}
