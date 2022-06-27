<script lang="ts">
import CounterIsland from "./Counter.island.vue";
import ExpandableIsland from "./Expandable.island.vue";
import MediaQueryIsland from "./MediaQuery.island.vue";
import ServerContent from "./ServerContent.vue";
export default {
  components: {
    CounterIsland,
    ExpandableIsland,
    MediaQueryIsland,
    ServerContent,
  },
};
</script>
<template>
  <main>
    <h1>Partial hydration with Vue and <i>Capri</i></h1>
    <section>This page is static, but contains some dynamic parts.</section>
    <section>Here is a simple counter: <CounterIsland></CounterIsland></section>
    <section>
      And here is another one, independent from the one above:
      <CounterIsland :start="100"></CounterIsland>
    </section>
    <ExpandableIsland>
      <template #title>Click to expand</template>
      <template #body>
        <ServerContent>
          The code for <code>ServerContent</code> won't show up in the client
          bundle.
        </ServerContent>
      </template>
    </ExpandableIsland>
    <MediaQueryIsland></MediaQueryIsland>
    <router-link to="/about">Another page</router-link>
  </main>
</template>
