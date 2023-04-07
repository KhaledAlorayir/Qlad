<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton";
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <h2>Qlad</h2>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <button type="button" class="btn variant-filled-primary rounded-md"
      >Login</button
    >
  </svelte:fragment>
</AppBar>
