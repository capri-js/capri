<script setup lang="ts">
import { ref } from "vue";
import StaticContent from "./StaticContent.lagoon.vue";
const expanded = ref(false);
</script>

<template>
  <div class="box" :data-expanded="expanded">
    <StaticContent></StaticContent>
    <button @click="expanded = !expanded">
      <slot name="title">Title</slot>
    </button>
    <div class="expandable-content">
      <StaticContent>
        This a second lagoon. Below you see the body slot that was passed to the
        Expandable island:
      </StaticContent>
      <slot name="body">Body</slot>
    </div>
  </div>
</template>

<style scoped>
button::after {
  display: inline-block;
  margin-left: 0.5em;
  content: ">";
  transition: all 0.2s ease-in-out;
}

[data-expanded="true"] > button::after {
  transform: rotateZ(90deg);
}

.expandable-content {
  overflow: hidden;
  margin: 0.5em 0;
}

[data-expanded="false"] > .expandable-content {
  height: 0;
}
</style>
