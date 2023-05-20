import {
  getQuiz,
  getQuizWithSubmissionCount,
  getSubmissionsWithQuestionsAndAnswers,
} from "$lib/crud.js";
import { AuthenticatePage } from "$lib/helpers/authenticate.js";
import { PaginationParamsSchema, QuizIdParamsSchema } from "$lib/schema.js";
import { error } from "@sveltejs/kit";

export async function load({ params, locals, url }) {
  const userId = await AuthenticatePage(locals);
  const validatedParams = QuizIdParamsSchema.safeParse(params);
  const validatedQuery = PaginationParamsSchema.safeParse(
    url.searchParams.get("page")
  );

  if (!validatedParams.success) {
    throw error(400, "invalid id");
  }

  const quiz = await getQuizWithSubmissionCount(validatedParams.data.quizId);

  if (!quiz || quiz.userId !== userId) {
    throw error(404);
  }

  const submissions = await getSubmissionsWithQuestionsAndAnswers(
    validatedParams.data.quizId,
    validatedQuery.success ? validatedQuery.data : 1
  );
  return {
    quiz,
    submissions,
  };
}

//TODO:
//1- Add username when submit
//2- figure out how to number submissions (store inc number db?)
