<script context="module">
  // Components can export a load function:
  export async function load(props, route, ssrCtx) {
    // The data must be returned as `ssrState`:
    return {
      ssrState: await fetchData(),
    };
  }

  function fetchData() {
    // This could be a fetch request...
    return new Promise((resolve) => {
      setTimeout(() => resolve("loaded"), 0);
    });
  }
</script>

<script>
  import { onMount } from "svelte";
  import { RouterLink } from "svelte-pilot";

  export let ssrState;

  // In order to make this also work when running as SPA we have to fetch the data on mount:
  onMount(async () => {
    ssrState = await fetchData();
  });
</script>

<main>
  <h1>This page is completely static.</h1>
  <section>
    An since it does not contain any interactive islands, no JavaScript is
    shipped to the browser. Async data: {ssrState}
  </section>
  <RouterLink to="..">Home</RouterLink>
</main>
