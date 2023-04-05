import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const example = pgTable("examples", {
  id: serial("id").primaryKey(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});
