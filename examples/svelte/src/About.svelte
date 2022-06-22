<script>
  import { RouterLink } from "svelte-pilot";
</script>

<main>
  <h1>This page is completely static.</h1>
  <section>
    An since it does not contain any interactive islands, no JavaScript is
    shipped to the browser.
  </section>
  <RouterLink to="..">Home</RouterLink>
</main>
