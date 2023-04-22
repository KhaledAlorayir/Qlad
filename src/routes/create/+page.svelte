<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
  let questions: string[] = [""];

  function addHandler() {
    if (questions.length < 15) {
      questions.push("");
      questions = questions;
    }
  }

  function deleteHandler() {
    if (questions.length > 1) {
      questions.pop();
      questions = questions;
    }
  }
</script>

<main class="py-12">
  {#if form?.issues}
    <aside class="alert variant-ghost max-w-xl mx-auto my-8">
      <div class="alert-message">
        <h3>Error</h3>
        <ul>
          {#each form.issues as issue, i (i)}
            <li>{issue}</li>
          {/each}
        </ul>
      </div>
    </aside>
  {/if}
  <form class="max-w-xl mx-auto flex flex-col gap-y-10 items-end" method="post">
    <input
      class="input"
      type="text"
      placeholder="Q title"
      required
      minlength="1"
      maxlength="50"
      name="title"
    />
    <input
      class="input"
      type="number"
      placeholder="submissions limit"
      min="1"
      name="submissionLimit"
    />

    {#each questions as question, i (i)}
      <div class="w-full gap-2 flex items-center">
        <input
          class="input"
          type="text"
          placeholder={`question ${i + 1}`}
          required
          minlength="1"
          maxlength="100"
          name={`question${i}`}
        />
        {#if i === questions.length - 1}
          {#if questions.length !== 15}
            <button
              on:click={addHandler}
              type="button"
              class="btn-sm rounded-lg variant-soft-success">+</button
            >
          {/if}
          {#if questions.length !== 1}
            <button
              on:click={deleteHandler}
              type="button"
              class="btn-sm rounded-lg variant-soft-success">-</button
            >
          {/if}
        {/if}
      </div>
    {/each}

    <button type="submit" class="variant-filled-secondary btn">Create</button>
  </form>
</main>
