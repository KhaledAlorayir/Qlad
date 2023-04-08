DROP TABLE verification_tokens;
ALTER TABLE "accounts" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "sessions" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;