<script lang="ts">
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

{#if form?.success}
  <main class="h-full flex justify-center items-center">
    <h4>answers have been submitted!</h4>
  </main>
{:else}
  <main class="py-12">
    {#if form?.message}
      <aside class="alert variant-ghost max-w-xl mx-auto my-8">
        <div class="alert-message">
          <h3>Error</h3>
          <p>{form.message}</p>
        </div>
      </aside>
    {/if}
    <section class="mb-10 text-center">
      <h3 class="text-primary-500 font-bold">{data.quiz.title}</h3>
      <h6>by: {data.quiz.username}</h6>
    </section>
    <form
      class="max-w-xl mx-auto flex flex-col gap-y-10 items-end"
      method="post"
    >
      {#each data.questions as question (question.id)}
        <label class="label w-full">
          <span class="px-3 font-semibold">{question.content}</span>
          <input
            class="input"
            type="text"
            placeholder="answer here.."
            required
            minlength="1"
            maxlength="255"
            name={question.id}
          />
        </label>
      {/each}
      <input type="hidden" name="quizId" value={data.quiz.id} />
      <button type="submit" class="variant-filled-secondary btn">Submit</button>
    </form>
  </main>
{/if}
