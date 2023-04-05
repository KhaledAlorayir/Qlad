import { db } from "$lib/db/client";
import { example } from "$lib/db/schema";

export async function getAllExamples() {
  return db.select().from(example);
}
