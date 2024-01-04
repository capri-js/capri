import { createSignal, onMount } from "solid-js";

export const options = {
  media: "(max-width:500px)",
};

export default function MediaQuery() {
  const [content, setContent] = createSignal(
    "Resize your browser below 500px to hydrate this island.",
  );
  onMount(() => {
    setContent("The island has been hydrated.");
  });
  return <div class="box">{content}</div>;
}
