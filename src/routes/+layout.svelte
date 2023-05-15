<script>
  import "@skeletonlabs/skeleton/themes/theme-crimson.css";
  import "@skeletonlabs/skeleton/styles/all.css";
  import "../app.postcss";
  import { AppShell } from "@skeletonlabs/skeleton";
  import Navbar from "$lib/components/Navbar.svelte";
  import { Toast } from "@skeletonlabs/skeleton";
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Navbar />
  </svelte:fragment>
  <main class="h-full container mx-auto px-4">
    <slot />
  </main>
  <Toast />
</AppShell>
