<script setup lang="ts">
console.log(
  "Rendering StaticContent. This should only happen during build or in SPA mode."
);
</script>

<template>
  <div class="box">
    <slot>This is static content inside an island. We call this a lagoon.</slot>
  </div>
</template>
