<script lang="ts">
  import type { Pagination } from "$lib/types";

  export let paginatedData: Pagination<any>;
  export let route: string;
</script>

{#if paginatedData.pagesCount > 1}
  <div class="text-center">
    <a
      class={`btn variant-filled-secondary rounded-md ${
        paginatedData.page <= 1 ? "pointer-events-none opacity-60" : ""
      }`}
      href={`${route}?page=${paginatedData.page - 1}`}>Prev</a
    >
    <a
      class={`btn variant-filled-secondary rounded-md ${
        paginatedData.page >= paginatedData.pagesCount
          ? "pointer-events-none opacity-60"
          : ""
      }`}
      href={`${route}?page=${paginatedData.page + 1}`}>Next</a
    >
  </div>
{/if}
