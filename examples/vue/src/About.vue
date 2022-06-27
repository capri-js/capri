<script setup lang="ts">
import AsyncData from "./AsyncData.vue";
</script>
<template>
  <main>
    <h1>This page is completely static.</h1>
    <section>
      An since it does not contain any interactive islands, no JavaScript is
      shipped to the browser. Async data:
      <Suspense>
        <template #fallback><span>Loading...</span></template>
        <AsyncData />
      </Suspense>
    </section>
    <router-link to="/">Home</router-link>
  </main>
</template>
