import fs from "node:fs";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";
import { and, desc, eq, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { leads, type Lead } from "@/lib/schema";

type AppDb = {
  orm: ReturnType<typeof drizzle>;
  client: Client;
};

const globalForDb = globalThis as unknown as { fichaLibsql?: AppDb };

function resolveDatabaseUrl() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error("Falta TURSO_DATABASE_URL");
  }

  if (url.startsWith("file:")) {
    const raw = url.slice("file:".length);
    const filePath = path.isAbsolute(raw)
      ? raw
      : path.join(/* turbopackIgnore: true */ process.cwd(), raw);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    return `file:${filePath}`;
  }

  return url;
}

async function ensureSchema(client: Client) {
  await client.executeMultiple(`
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
}

async function getDb() {
  if (!globalForDb.fichaLibsql) {
    const client = createClient({
      url: resolveDatabaseUrl(),
      authToken: process.env.TURSO_AUTH_TOKEN || undefined,
    });
    await ensureSchema(client);
    globalForDb.fichaLibsql = {
      orm: drizzle(client, { schema: { leads } }),
      client,
    };
  }
  return globalForDb.fichaLibsql.orm;
}

export function closeDbForTests() {
  try {
    globalForDb.fichaLibsql?.client.close();
  } catch {
    // already closed
  }
  globalForDb.fichaLibsql = undefined;
}

export async function insertLead(input: {
  fullName: string;
  email: string;
  planId: string;
}) {
  const db = await getDb();
  await db.insert(leads).values({
    fullName: input.fullName,
    email: input.email,
    planId: input.planId,
    createdAt: Date.now(),
  });
}

export async function listLeads(filters: {
  q?: string;
  planId?: string;
}): Promise<Lead[]> {
  const db = await getDb();
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
