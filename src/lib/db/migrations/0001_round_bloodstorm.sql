CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" bigint,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	"oauth_token_secret" text,
	"oauth_token" text,
	"user_id" uuid
);

CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	"session_token" text NOT NULL,
	"user_id" uuid
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text,
	"email_verified" timestamp with time zone,
	"image" text
);

CREATE TABLE IF NOT EXISTS "verification_tokens" (
	"token" text PRIMARY KEY NOT NULL,
	"identifier" text,
	"expires" timestamp with time zone NOT NULL
);

DROP TABLE examples;
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "provider_unique" ON "accounts" ("provider","provider_account_id");
CREATE UNIQUE INDEX IF NOT EXISTS "session_token_unique" ON "sessions" ("session_token");
CREATE UNIQUE INDEX IF NOT EXISTS "email_unique" ON "users" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "token_unique" ON "verification_tokens" ("token");
CREATE UNIQUE INDEX IF NOT EXISTS "token_identifier_unique" ON "verification_tokens" ("token","identifier");