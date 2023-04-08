ALTER TABLE "questions" RENAME COLUMN "user_id" TO "quizId";
ALTER TABLE "submissions" RENAME COLUMN "user_id" TO "quizId";
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_quizId_quizzes_id_fk" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "questions" DROP CONSTRAINT "questions_user_id_quizzes_id_fk";

DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_quizId_quizzes_id_fk" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "submissions" DROP CONSTRAINT "submissions_user_id_quizzes_id_fk";
