import { getUserQuizzes } from "$lib/crud.js";
import { PaginationParamsSchema } from "$lib/schema.js";

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
