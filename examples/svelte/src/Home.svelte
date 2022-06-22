<script>
  import CounterIsland from "./Counter.island.svelte";
  import { RouterLink } from "svelte-pilot";
  import ExpandableIsland from "./Expandable.island.svelte";
  import ServerContent from "./ServerContent.svelte";
</script>

<main>
  <h1>
    Partial hydration with Svelte and <i>Capri</i>
  </h1>
  <section>This page is static, but contains some dynamic parts.</section>
  <section>
    Here is a simple counter: <CounterIsland />
  </section>
  <section>
    And here is another one, independent from the one above: <CounterIsland
      counter={100}
    />
  </section>
  <ExpandableIsland>
    <span slot="title">Click to expand</span>
    <div slot="body">
      <ServerContent>
        The code for <code>ServerContent</code> won't show up in the client bundle.
      </ServerContent>
    </div>
  </ExpandableIsland>
  <RouterLink to="about">Link to another page</RouterLink>
</main>
