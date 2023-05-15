import { CreateSubmissionSchema, QuizIdParamsSchema } from "$lib/schema.js";
import { error, fail, redirect } from "@sveltejs/kit";
import {
  getQuizWithQuestionsAndUser,
  getQuizWithSubmissionCount,
  insertSubmissionWithAnswers,
} from "$lib/crud.js";
import type { Actions } from "./$types.js";

export async function load({ params }) {
  const validated = QuizIdParamsSchema.safeParse(params);

  if (!validated.success) {
    throw error(400, "invalid id");
  }

  const result = await getQuizWithQuestionsAndUser(validated.data.quizId);

  if (!result) {
    throw error(404);
  }

  return result;
}

export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    const answers: { questionId: string; content: string }[] = [];

    Object.keys(formData).forEach((key) => {
      if (key !== "quizId") {
        answers.push({
          questionId: key,
          content: formData[key].toString(),
        });
      }
    });
    const validated = CreateSubmissionSchema.safeParse({
      answers,
      quizId: formData.quizId,
    });

    if (!validated.success) {
      return fail(400, { message: "please fill all the answers" });
    }

    const quiz = await getQuizWithSubmissionCount(validated.data.quizId);

    if (!quiz) {
      throw error(404);
    }

    if (quiz.submissionLimit && quiz.submissionsCount >= quiz.submissionLimit) {
      return fail(400, {
        message: "submissions has exceeded the allowed limit",
      });
    }

    await insertSubmissionWithAnswers(validated.data);
    return { success: true };
  },
} satisfies Actions;
