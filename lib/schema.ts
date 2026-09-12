import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  planId: text("plan_id").notNull(),
  createdAt: integer("created_at", { mode: "number" }).notNull(),
});

export type Lead = typeof leads.$inferSelect;
