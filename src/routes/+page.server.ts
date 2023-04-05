import type { PageServerLoad } from "./$types";
import { getAllExamples } from "$lib/crud";

export const load = (async () => {
  const test = await getAllExamples();

  return {
    test,
  };
}) satisfies PageServerLoad;
