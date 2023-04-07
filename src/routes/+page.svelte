<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1 class="text-center text-xs text-red-500">{JSON.stringify(data.test)}</h1>
