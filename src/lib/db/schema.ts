import { relations } from "drizzle-orm";
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
    emailVerified: timestamp("email_verified", {
      withTimezone: true,
    }),
    image: text("image"),
  },
  (User) => ({
    email_unique: uniqueIndex("email_unique").on(User.email),
  })
);

export const userRelations = relations(User, ({ many }) => ({
  quizzes: many(Quiz),
}));

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
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => User.id),
  submissionLimit: integer("submission_limit"),
});

export const quizRelations = relations(Quiz, ({ many, one }) => ({
  user: one(User, {
    fields: [Quiz.userId],
    references: [User.id],
  }),
  questions: many(Question),
  submissions: many(Submission),
}));

export const Question = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  content: text("text").notNull(),
  quizId: uuid("quizId")
    .notNull()
    .references(() => Quiz.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const questionRelations = relations(Question, ({ many, one }) => ({
  quiz: one(Quiz, {
    fields: [Question.quizId],
    references: [Quiz.id],
  }),
  answers: many(Answer),
}));

export const Submission = pgTable("submissions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  quizId: uuid("quizId")
    .notNull()
    .references(() => Quiz.id, { onDelete: "cascade" }),
});

export const submissionRelations = relations(Submission, ({ many, one }) => ({
  quiz: one(Quiz, {
    fields: [Submission.quizId],
    references: [Quiz.id],
  }),
  answers: many(Answer),
}));

export const Answer = pgTable("answers", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  content: text("text").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  questionId: uuid("question_id")
    .notNull()
    .references(() => Question.id, { onDelete: "cascade" }),
  submissionId: uuid("submission_id")
    .notNull()
    .references(() => Submission.id, { onDelete: "cascade" }),
});

export const answerRelations = relations(Answer, ({ one }) => ({
  submission: one(Submission, {
    fields: [Answer.submissionId],
    references: [Submission.id],
  }),
  Question: one(Question, {
    fields: [Answer.questionId],
    references: [Question.id],
  }),
}));
