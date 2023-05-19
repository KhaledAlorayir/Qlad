import type { InferModel } from "drizzle-orm";
import type { Quiz, Question, Submission, Answer } from "./db/schema";
export interface Pagination<T> {
  results: T[];
  pagesCount: number;
  page: number;
}

export interface QuizWithCount {
  id: string;
  title: string;
  createdAt: Date;
  submissionsCount: number;
  submissionLimit: number | null;
  userId: string;
}
