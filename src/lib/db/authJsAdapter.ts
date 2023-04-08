import type { Adapter } from "@auth/core/adapters";
import { db } from "./client";
import { User, Account, Session } from "./schema";
import { and, eq } from "drizzle-orm/expressions";

export const drizzleAdapter: Adapter = {
  createUser: async (user) => {
    const [inserted] = await db
      .insert(User)
      .values({
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        name: user.name,
      })
      .returning();

    return inserted;
  },
  getUser: async (id) => {
    const [user] = await db.select().from(User).where(eq(User.id, id));
    return user ? user : null;
  },
  getUserByEmail: async (email) => {
    const [user] = await db.select().from(User).where(eq(User.email, email));
    return user ? user : null;
  },
  getUserByAccount: async ({ provider, providerAccountId }) => {
    const [result] = await db
      .select()
      .from(User)
      .leftJoin(Account, eq(User.id, Account.userId))
      .where(
        and(
          eq(Account.provider, provider),
          eq(Account.providerAccountId, providerAccountId)
        )
      );

    return result && result.users ? result.users : null;
  },
  updateUser: async (user) => {
    if (user.id) {
      const [updated] = await db
        .update(User)
        .set({
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
          name: user.name,
        })
        .where(eq(User.id, user.id))
        .returning();
      return updated;
    }
    throw new Error("id not given to update");
  },
  linkAccount: async (account) => {
    await db.insert(Account).values({
      provider: account.provider,
      providerAccountId: account.providerAccountId,
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      type: account.type,
      userId: account.userId,
      idToken: account.id_token,
      tokenType: account.token_type,
      scope: account.scope,
      expiresAt: account.expires_in ? BigInt(account.expires_in) : null,
    });
  },
  createSession: async (session) => {
    await db.insert(Session).values({
      ...session,
    });
    return session;
  },
  getSessionAndUser: async (sessionToken) => {
    const [result] = await db
      .select()
      .from(Session)
      .fullJoin(User, eq(User.id, Session.userId))
      .where(eq(Session.sessionToken, sessionToken));
    return result && result.sessions && result.users
      ? {
          session: result.sessions,
          user: result.users,
        }
      : null;
  },
  updateSession: async ({ sessionToken, expires, userId }) => {
    const [updated] = await db
      .update(Session)
      .set({
        sessionToken,
        expires,
        userId,
      })
      .where(eq(Session.sessionToken, sessionToken))
      .returning();

    return updated;
  },
  deleteSession: async (sessionToken) => {
    const [deleted] = await db
      .delete(Session)
      .where(eq(Session.sessionToken, sessionToken))
      .returning();

    return deleted ? deleted : null;
  },
};
