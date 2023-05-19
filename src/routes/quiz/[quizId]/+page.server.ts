import { getQuizWithSubmissions } from "$lib/crud.js";
import { QuizIdParamsSchema } from "$lib/schema.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const validated = QuizIdParamsSchema.safeParse(params);

  if (!validated.success) {
    throw error(400, "invalid id");
  }
  //create page + make sure quiz exists and own by user
  const results = await getQuizWithSubmissions(validated.data.quizId);
  console.log(JSON.stringify(results, null, 2));
  return {};
}
