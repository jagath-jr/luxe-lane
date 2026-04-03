import { Pool } from "pg";

const globalForDb = globalThis;

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to your environment variables.");
  }

  return new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });
}

export function getDb() {
  if (!globalForDb.dbPool) {
    globalForDb.dbPool = createPool();
  }

  return globalForDb.dbPool;
}
