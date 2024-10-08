<script lang="ts">
  import Fileupload from '$lib/components/Fileupload.svelte';


</script>

<div>
  <Fileupload />
    <slot />
</div>

<style>
  div {
    padding: 0;
    margin: 0;
  }
</style>