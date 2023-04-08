<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import { signIn, signOut } from "@auth/sveltekit/client";
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <h2>Qlad</h2>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    {#if !$page.data.session}
      <button
        class="btn variant-filled-primary rounded"
        on:click={() => signIn()}>Login</button
      >
    {:else}
      <button
        class="btn variant-filled-error rounded"
        on:click={() => signOut()}>Logout</button
      >
    {/if}
  </svelte:fragment>
</AppBar>
