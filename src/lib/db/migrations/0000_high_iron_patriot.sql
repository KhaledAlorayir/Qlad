CREATE TABLE IF NOT EXISTS "examples" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"created_at" timestamp DEFAULT now()
);
