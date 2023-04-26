import { db } from "$lib/db/client";
import { Quiz, Question, Submission, User, Answer } from "$lib/db/schema";
import type { CreateQuizSchema, CreateSubmissionSchema } from "$lib/schema";
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

export async function getQuiz(quizId: string) {
  const [quiz] = await db.select().from(Quiz).where(eq(Quiz.id, quizId));
  return quiz;
}

export async function deleteQuiz(quizId: string) {
  await db.delete(Quiz).where(eq(Quiz.id, quizId));
}

export async function getQuizWithQuestionsAndUser(quizId: string) {
  const result = await db
    .select({
      quiz: {
        id: Quiz.id,
        title: Quiz.title,
        createdAt: Quiz.createdAt,
        userId: Quiz.userId,
        submissionsCount: sql<number>`count(${Submission.id})`,
        submissionLimit: Quiz.submissionLimit,
        username: User.name,
      },
      question: {
        id: Question.id,
        content: Question.content,
      },
    })
    .from(Quiz)
    .innerJoin(Question, eq(Quiz.id, Question.quizId))
    .leftJoin(Submission, eq(Quiz.id, Submission.quizId))
    .innerJoin(User, eq(User.id, Quiz.userId))
    .groupBy(Quiz.id, Question.id, User.name)
    .where(eq(Quiz.id, quizId));

  if (!result.length) {
    return null;
  }

  const questions = result.map((r) => r.question);
  const { quiz } = result[0];
  quiz.submissionsCount = Number(quiz.submissionsCount);

  return {
    quiz,
    questions,
  };
}

export async function insertSubmissionWithAnswers(
  data: CreateSubmissionSchema
) {
  const [submission] = await db
    .insert(Submission)
    .values({ quizId: data.quizId })
    .returning();

  await db.insert(Answer).values(
    data.answers.map((a) => ({
      content: a.content,
      questionId: a.questionId,
      submissionId: submission.id,
    }))
  );
}

export async function getQuizWithSubmissionCount(quizId: string) {
  const [quiz] = await db
    .select({
      id: Quiz.id,
      title: Quiz.title,
      createdAt: Quiz.createdAt,
      userId: Quiz.userId,
      submissionLimit: Quiz.submissionLimit,
      submissionsCount: sql<number>`count(${Submission.id})`,
    })
    .from(Quiz)
    .leftJoin(Submission, eq(Quiz.id, Submission.quizId))
    .groupBy(Quiz.id)
    .where(eq(Quiz.id, quizId));

  if (!quiz) {
    return null;
  }
  quiz.submissionsCount = Number(quiz.submissionsCount);
  return quiz;
}
