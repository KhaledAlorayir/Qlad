import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/*
  TODO:
  1- db schema
  2- seeder if needed
  3- auth with supabase
*/

export const example = pgTable("examples", {
  id: serial("id").primaryKey(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});
