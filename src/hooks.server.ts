import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/core/providers/discord";
import { DISCORD_ID, DISCORD_SECRET } from "$env/static/private";
import { drizzleAdapter } from "$lib/helpers/authJsAdapter";

export const handle = SvelteKitAuth({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  providers: [Discord({ clientId: DISCORD_ID, clientSecret: DISCORD_SECRET })],
  adapter: drizzleAdapter,
  callbacks: {
    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      session.user?.name;
      return session;
    },
  },
});
