<script setup lang="ts">
console.log(
  "Rendering ServerContent. This should only happen during build or in SPA mode."
);
</script>

<template>
  <div class="box"><slot>Empty</slot></div>
</template>
