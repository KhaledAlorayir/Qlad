import { CreateQuizSchema } from "$lib/schema";
import { AuthenticatePage } from "$lib/helpers/authenticate.js";
import { parseCreateQuizZodError } from "$lib/helpers/parseZodError";
import type { Actions } from "./$types";
import { insertQuizWithQuestions } from "$lib/crud";
import { fail, redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  await AuthenticatePage(locals);
}

export const actions = {
  default: async ({ request, locals }) => {
    const userId = await AuthenticatePage(locals);

    const data = Object.fromEntries(await request.formData());
    const questions: string[] = [];

    Object.keys(data).forEach((key) => {
      if (key.includes("question")) {
        questions.push(data[key].toString());
      }
    });

    const validated = CreateQuizSchema.safeParse({
      title: data.title,
      submissionLimit: data.submissionLimit.length
        ? data.submissionLimit
        : null,
      questions,
    });

    if (!validated.success) {
      return fail(400, {
        issues: parseCreateQuizZodError(validated.error.issues),
      });
    }

    await insertQuizWithQuestions(validated.data, userId);
    throw redirect(303, "/");
  },
} satisfies Actions;
