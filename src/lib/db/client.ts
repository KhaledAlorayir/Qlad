import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import dotenv from "dotenv";
// //import { migrate } from "drizzle-orm/node-postgres/migrator";
// import { example } from "./schema";

dotenv.config();
const pool = new pg.Pool({
  connectionString: process.env.SECRET_DB_CONNECTION,
});

export const db = drizzle(pool);
//await migrate(db, { migrationsFolder: "src/db/migrations" });

// async function run() {}

// run();
