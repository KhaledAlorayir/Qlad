<script lang="ts">
  import { page } from "$app/stores";
  import { getDate } from "$lib/helpers/parseDate";
  import type { QuizWithCount } from "$lib/types";
  import { toastStore } from "@skeletonlabs/skeleton";

  export let quiz: QuizWithCount;

  function copyUrl() {
    navigator.clipboard.writeText(
      `http://localhost:5173/quiz/${quiz.id}/submission`
    );
    toastStore.trigger({
      message: "link has been copied :)",
    });
  }
</script>

<div class="card p-4 flex-1">
  <header class="card-header flex justify-between">
    <h4>{quiz.title}</h4>
    <button on:click={copyUrl} class="btn btn-sm variant-ghost-primary"
      >Link</button
    >
  </header>
  <section class="p-4">{getDate(quiz.createdAt)}</section>
  <footer class="card-footer flex flex-col gap-2">
    <p>
      submissions: {quiz.submissionsCount}
      {#if quiz.submissionLimit}
        <span>/ {quiz.submissionLimit}</span>
      {/if}
    </p>
    <div>
      {#if quiz.userId === $page.data.session?.user?.id}
        <a href={`/quiz/${quiz.id}`} class="btn btn-sm variant-filled-primary"
          >Status</a
        >
        <form method="POST" action="/?/delete" class="inline-block">
          <input type="hidden" name="quizId" value={quiz.id} />
          <input
            type="hidden"
            name="page"
            value={$page.url.searchParams.get("page")}
          />
          <button type="submit" class="btn btn-sm variant-filled-surface"
            >DELETE</button
          >
        </form>
      {/if}
    </div>
  </footer>
</div>
