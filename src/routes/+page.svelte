<script lang="ts">
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
</script>

<button
  on:click={() => {
    signIn("discord");
  }}>CLICK</button
>

<button
  on:click={() => {
    signOut();
  }}>LOGOUT</button
>
<h2>{JSON.stringify($page.data.session)}</h2>
