<script>
  export let counter = 0;
</script>

<div>
  <button on:click={() => counter--}>-</button>
  <span>{counter}</span>
  <button on:click={() => counter++}>+</button>
</div>

<style>
  div {
    display: flex;
  }
</style>
