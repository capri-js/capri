<script>
  console.log(
    "Rendering StaticContent. This should only happen during build or in SPA mode."
  );
</script>

<div class="box">
  <slot>This is static content inside an island. We call this a lagoon.</slot>
</div>
