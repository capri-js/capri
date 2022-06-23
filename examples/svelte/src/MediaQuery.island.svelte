<script context="module">
  export const options = {
    media: "(max-width:500px)",
  };
</script>

<script>
  import { onMount } from "svelte";
  let content = "Resize your browser below 500px to hydrate this island.";
  onMount(() => {
    content = "The island has been hydrated.";
  });
</script>

<div class="box">
  {content}
</div>
