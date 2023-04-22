import { redirect } from "@sveltejs/kit";
// IMPLEMENT delete quiz and redirect
// maintain page?
export async function load() {
  console.log("running");
  throw redirect(303, "/");
}
