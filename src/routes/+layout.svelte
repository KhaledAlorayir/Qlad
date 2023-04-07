<script>
  import "@skeletonlabs/skeleton/themes/theme-rocket.css";
  import "@skeletonlabs/skeleton/styles/all.css";
  import "../app.postcss";
  import { AppShell } from "@skeletonlabs/skeleton";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Navbar />
  </svelte:fragment>
  <slot />
</AppShell>
