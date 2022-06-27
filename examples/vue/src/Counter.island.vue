<script setup lang="ts">
import { ref } from "vue";

interface Props {
  start?: number;
}
const { start = 0 } = defineProps<Props>();
const count = ref(start);
</script>

<template>
  <div data-testid="counter">
    <button @click="count--">-</button>
    <span>{{ count }}</span>
    <button @click="count++">+</button>
  </div>
</template>

<style scoped>
div {
  display: inline-flex;
  gap: 0.5em;
}
</style>
