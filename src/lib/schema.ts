import { z } from "zod";

export const CreateQuizSchema = z.object({
  title: z.string().trim().min(1).max(50),
  submissionLimit: z.coerce.number().positive().optional().nullable(),
  questions: z.array(z.string().trim().min(1).max(100)).max(15),
});

export const PaginationParamsSchema = z.coerce.number().min(1);

export type CreateQuizSchema = z.infer<typeof CreateQuizSchema>;
