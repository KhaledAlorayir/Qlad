<script lang="ts">
  import Paginator from "$lib/components/Paginator.svelte";
  import QuizCard from "$lib/components/QuizCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main class="py-8">
  <header class="text-center">
    <a href="/create" class="btn btn-lg variant-filled-surface rounded-md"
      >Create Q</a
    >
  </header>
  {#if data.quizzes}
    <section class="my-4">
      <h4 class="font-bold mb-8">quizzes</h4>
      <div
        class="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8"
      >
        {#each data.quizzes.results as quiz (quiz.id)}
          <QuizCard {quiz} />
        {/each}
      </div>
      <Paginator route="/" paginatedData={data.quizzes} />
    </section>
  {/if}
</main>
