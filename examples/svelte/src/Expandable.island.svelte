<script>
  import StaticContent from "./StaticContent.lagoon.svelte";

  export let expanded = false;
</script>

<div data-expanded={expanded}>
  <StaticContent />
  <button on:click={() => (expanded = !expanded)}>
    <slot name="title" />
  </button>
  <div class="expandable-content">
    <StaticContent>
      This a second lagoon. Below you see the body slot that was passed to the
      Expandable island:
    </StaticContent>
    <slot name="body" />
  </div>
</div>

<style>
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
