<script>
  export let counter = 0;
</script>

<div data-testid="counter">
  <button on:click={() => counter--}>-</button>
  <span>{counter}</span>
  <button on:click={() => counter++}>+</button>
</div>

<style>
  div {
    display: flex;
    gap: 0.5em;
  }
</style>
