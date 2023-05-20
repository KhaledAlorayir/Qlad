<script lang="ts">
  import { AccordionItem } from "@skeletonlabs/skeleton";

  export let submission: {
    id: string;
    answers: {
      id: string;
      content: string;
      Question: {
        content: string;
      };
    }[];
  };

  export let number: number;
</script>

<AccordionItem>
  <svelte:fragment slot="summary">
    <p class="font-semibold">Submission #{number}</p>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <section class="space-y-3">
      {#each submission.answers as entry (entry.id)}
        <aside class="space-y-1">
          <p class="text-lg font-bold text-primary-400">
            {entry.Question.content}
          </p>
          <p class="font-semibold">{entry.content}</p>
        </aside>
      {/each}
    </section>
  </svelte:fragment>
</AccordionItem>
