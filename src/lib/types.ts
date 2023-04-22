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
