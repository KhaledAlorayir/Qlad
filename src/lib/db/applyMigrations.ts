import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./client";

await migrate(db, { migrationsFolder: "src/lib/db/migrations" });
