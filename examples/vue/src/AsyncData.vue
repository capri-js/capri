<script setup lang="ts">
function fetchData() {
  // This could be a fetch request...
  return new Promise((resolve) => {
    setTimeout(() => resolve("loaded"), 500);
  });
}
const data = await fetchData();
</script>
<template>
  <span>{{ data }}</span>
</template>
