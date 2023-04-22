import { db } from "$lib/db/client";
import { Quiz, Question, Submission } from "$lib/db/schema";
import type { CreateQuizSchema } from "$lib/schema";
import { sql } from "drizzle-orm";
import { and, desc, eq } from "drizzle-orm/expressions";

const PAGE_SIZE = 20;

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

export async function getUserQuizzes(userId: string, page = 1) {
  const [result] = await db
    .select({
      quizCount: sql<number>`count(${Quiz.id})`,
    })
    .from(Quiz)
    .where(and(eq(Quiz.userId, userId)));

  const pagesCount = Math.ceil(result.quizCount / PAGE_SIZE);
  page = page <= pagesCount && page > 0 ? page : 1;

  if (result.quizCount) {
    page--;
    const results = await db
      .select({
        id: Quiz.id,
        title: Quiz.title,
        createdAt: Quiz.createdAt,
        userId: Quiz.userId,
        submissionsCount: sql<number>`count(${Submission.id})`,
        submissionLimit: Quiz.submissionLimit,
      })
      .from(Quiz)
      .leftJoin(Submission, eq(Quiz.id, Submission.quizId))
      .groupBy(Quiz.id)
      .orderBy(desc(Quiz.createdAt))
      .limit(PAGE_SIZE)
      .offset(page * PAGE_SIZE)
      .where(and(eq(Quiz.userId, userId)));
    return {
      results,
      pagesCount,
      page: page + 1,
    };
  }
  return {
    results: [],
    pagesCount,
    page: 0,
  };
}
