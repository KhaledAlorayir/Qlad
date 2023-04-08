import { redirect } from "@sveltejs/kit";

export async function AuthenticatePage(locals: App.Locals) {
  const session = await locals.getSession();

  if (!session?.user) {
    throw redirect(303, "/auth/signin");
  }

  return session.user.id;
}
