import {
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
  bigint,
  integer,
} from "drizzle-orm/pg-core";

// AuthJs
export const User = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("email_verified", { withTimezone: true }),
    image: text("image"),
  },
  (User) => ({
    email_unique: uniqueIndex("email_unique").on(User.email),
  })
);

export const Session = pgTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
    sessionToken: text("session_token").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => User.id, {
        onDelete: "cascade",
        onUpdate: "no action",
      }),
  },
  (Session) => ({
    session_token_unique: uniqueIndex("session_token_unique").on(
      Session.sessionToken
    ),
  })
);

export const Account = pgTable(
  "accounts",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: bigint("expires_at", { mode: "bigint" }),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
    oauthTokenSecret: text("oauth_token_secret"),
    oauthToken: text("oauth_token"),
    userId: uuid("user_id")
      .notNull()
      .references(() => User.id, {
        onDelete: "cascade",
        onUpdate: "no action",
      }),
  },
  (Account) => ({
    provider_unique: uniqueIndex("provider_unique").on(
      Account.provider,
      Account.providerAccountId
    ),
  })
);
//

export const Quiz = pgTable("quizzes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("text").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => User.id),
  submissionLimit: integer("submission_limit"),
});

export const QuestionType = pgTable("question_types", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  type: text("text").notNull(),
});

export const Question = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  content: text("text").notNull(),
  quizId: uuid("user_id")
    .notNull()
    .references(() => Quiz.id),
  questionTypeId: uuid("question_type_id")
    .notNull()
    .references(() => QuestionType.id),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const Submission = pgTable("submissions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  quizId: uuid("user_id")
    .notNull()
    .references(() => Quiz.id),
});

export const Answer = pgTable("answers", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  content: text("text").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  questionId: uuid("question_id")
    .notNull()
    .references(() => Question.id),
  submissionId: uuid("submission_id")
    .notNull()
    .references(() => Submission.id),
});
