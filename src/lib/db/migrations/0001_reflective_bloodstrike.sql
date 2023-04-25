ALTER TABLE "answers" DROP CONSTRAINT "answers_question_id_questions_id_fk";
DO $$ BEGIN
 ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "answers" DROP CONSTRAINT "answers_submission_id_submissions_id_fk";
DO $$ BEGIN
 ALTER TABLE "answers" ADD CONSTRAINT "answers_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "questions" DROP CONSTRAINT "questions_quizId_quizzes_id_fk";
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_quizId_quizzes_id_fk" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "submissions" DROP CONSTRAINT "submissions_quizId_quizzes_id_fk";
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_quizId_quizzes_id_fk" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
