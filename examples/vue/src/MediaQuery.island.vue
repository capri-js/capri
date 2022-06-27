<script lang="ts">
export const options = {
  media: "(max-width:500px)",
};
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const content = ref("Resize your browser below 500px to hydrate this island.");

onMounted(() => {
  content.value = "The island has been hydrated.";
});
</script>

<template>
  <div class="box">{{ content }}</div>
</template>
