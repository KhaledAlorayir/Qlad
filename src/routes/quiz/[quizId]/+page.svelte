<script lang="ts">
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  import SubmissionCard from "$lib/components/SubmissionCard.svelte";
  import Paginator from "$lib/components/Paginator.svelte";

  export let data: PageData;
</script>

<main class="py-12">
  <header class="mb-10 text-center">
    <h3 class="text-primary-500 font-bold">{data.quiz.title}</h3>
  </header>
  {#if !data.submissions.results}
    <h4>No submissions yet</h4>
  {:else}
    <section class="flex flex-col gap-10 mb-8">
      <h4 class="text-right">
        {data.quiz.submissionsCount}
        {#if data.quiz.submissionLimit}
          <span> / {data.quiz.submissionLimit}</span>
        {/if}
        submissions
      </h4>
      <Accordion spacing="space-y-2">
        {#each data.submissions.results as submission, index (submission.id)}
          <SubmissionCard {submission} number={index + 1} />
        {/each}
      </Accordion>
    </section>
    <Paginator
      route={`/quiz/${data.quiz.id}`}
      paginatedData={data.submissions}
    />
  {/if}
</main>
