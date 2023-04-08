import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const pool = new pg.Pool({
  connectionString: process.env.SECRET_DB_CONNECTION,
});

export const db = drizzle(pool);
