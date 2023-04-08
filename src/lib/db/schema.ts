import {
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
  bigint,
} from "drizzle-orm/pg-core";

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
