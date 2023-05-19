import { getUserQuizzes, getQuiz, deleteQuiz } from "$lib/crud.js";
import { PaginationParamsSchema, QuizIdParamsSchema } from "$lib/schema.js";
import type { Actions } from "./$types";
import { AuthenticatePage } from "$lib/helpers/authenticate.js";
import { error, redirect } from "@sveltejs/kit";
//TODO: quiz page with each submission and answers
export async function load({ locals, url }) {
  const session = await locals.getSession();
  const validated = PaginationParamsSchema.safeParse(
    url.searchParams.get("page")
  );
  if (session?.user) {
    return {
      quizzes: await getUserQuizzes(
        session.user.id,
        validated.success ? validated.data : 1
      ),
    };
  }
}

export const actions = {
  delete: async ({ request, locals }) => {
    const userId = await AuthenticatePage(locals);
    const formData = Object.fromEntries(await request.formData());
    const validated = QuizIdParamsSchema.safeParse(formData);

    if (!validated.success) {
      throw error(400, "invalid id");
    }

    const quiz = await getQuiz(validated.data.quizId);

    if (!quiz) {
      throw error(404);
    }

    if (quiz.userId !== userId) {
      throw error(403);
    }

    await deleteQuiz(quiz.id);
    throw redirect(303, `/?page=${formData.page}`);
  },
} satisfies Actions;
