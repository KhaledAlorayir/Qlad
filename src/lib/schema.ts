import { z } from "zod";

export const CreateQuizSchema = z.object({
  title: z.string().trim().min(1).max(50),
  submissionLimit: z.coerce.number().positive().optional().nullable(),
  questions: z.array(z.string().trim().min(1).max(100)).max(15),
});
export type CreateQuizSchema = z.infer<typeof CreateQuizSchema>;

export const PaginationParamsSchema = z.coerce.number().min(1);

export const QuizIdParamsSchema = z.object({
  quizId: z.string().uuid(),
});

export const CreateSubmissionSchema = z.object({
  quizId: z.string().uuid(),
  answers: z
    .array(
      z.object({
        questionId: z.string().uuid(),
        content: z.string().trim().min(1).max(255),
      })
    )
    .min(1),
});
export type CreateSubmissionSchema = z.infer<typeof CreateSubmissionSchema>;
