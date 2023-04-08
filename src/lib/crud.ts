import { db } from "$lib/db/client";
import { Quiz, Question } from "$lib/db/schema";
import type { CreateQuizSchema } from "$lib/schema";

export async function insertQuizWithQuestions(
  data: CreateQuizSchema,
  userId: string
) {
  const [quiz] = await db
    .insert(Quiz)
    .values({
      title: data.title,
      submissionLimit: data.submissionLimit,
      userId,
    })
    .returning();

  await db
    .insert(Question)
    .values(data.questions.map((q) => ({ content: q, quizId: quiz.id })));
}
