<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    start: Number,
  },
  data() {
    return {
      count: this.start ?? 0,
    };
  },
});
</script>

<template>
  <div>
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
