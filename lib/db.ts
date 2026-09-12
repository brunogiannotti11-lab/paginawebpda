import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { and, desc, eq, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { leads, type Lead } from "@/lib/schema";

const dbFile = process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "leads.db");

type AppDb = ReturnType<typeof createDb>;

const globalForDb = globalThis as unknown as { sqliteDb?: AppDb };

function createDb() {
  fs.mkdirSync(path.dirname(dbFile), { recursive: true });
  const sqlite = new Database(dbFile);
  sqlite.pragma("journal_mode = WAL");
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      plan_id TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at);
    CREATE INDEX IF NOT EXISTS leads_plan_id_idx ON leads (plan_id);
  `);
  return drizzle(sqlite, { schema: { leads } });
}

export function getDb() {
  if (!globalForDb.sqliteDb) {
    globalForDb.sqliteDb = createDb();
  }
  return globalForDb.sqliteDb;
}

export async function insertLead(input: {
  fullName: string;
  email: string;
  planId: string;
}) {
  const db = getDb();
  db.insert(leads)
    .values({
      fullName: input.fullName,
      email: input.email,
      planId: input.planId,
      createdAt: Date.now(),
    })
    .run();
}

export async function listLeads(filters: {
  q?: string;
  planId?: string;
}): Promise<Lead[]> {
  const db = getDb();
  const conditions = [];

  if (filters.planId) {
    conditions.push(eq(leads.planId, filters.planId));
  }

  if (filters.q) {
    const term = `%${filters.q}%`;
    conditions.push(or(like(leads.fullName, term), like(leads.email, term)));
  }

  const query = db.select().from(leads).orderBy(desc(leads.createdAt));

  if (conditions.length === 0) {
    return query.all();
  }

  if (conditions.length === 1) {
    return query.where(conditions[0]!).all();
  }

  return query.where(and(...conditions)).all();
}
