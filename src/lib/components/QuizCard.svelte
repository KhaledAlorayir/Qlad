<script lang="ts">
  import { page } from "$app/stores";
  import { getDate } from "$lib/helpers/parseDate";
  import type { QuizWithCount } from "$lib/types";

  export let quiz: QuizWithCount;
</script>

<div class="card p-4 flex-1">
  <header class="card-header"><h4>{quiz.title}</h4></header>
  <section class="p-4">{getDate(quiz.createdAt)}</section>
  <footer class="card-footer flex justify-between items-center">
    <p>
      submissions: {quiz.submissionsCount}
      {#if quiz.submissionLimit}
        <span>/ {quiz.submissionLimit}</span>
      {/if}
    </p>
    <div>
      <a href={`/quiz/${quiz.id}`} class="btn btn-sm variant-filled-primary"
        >GO</a
      >
      {#if quiz.userId === $page.data.session?.user?.id}
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
