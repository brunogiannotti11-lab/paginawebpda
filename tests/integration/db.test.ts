import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { closeDbForTests, insertLead, listLeads } from "@/lib/db";

describe("leads sqlite", () => {
  let dir: string;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "ficha-leads-"));
    process.env.DATABASE_PATH = path.join(dir, "leads.db");
    closeDbForTests();
  });

  afterEach(() => {
    closeDbForTests();
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("guarda y lista fichas nuevas primero", async () => {
    await insertLead({
      fullName: "Ana Pérez",
      email: "ana@example.com",
      planId: "onix",
    });
    await insertLead({
      fullName: "Luis Gómez",
      email: "luis@example.com",
      planId: "s10",
    });

    const leads = await listLeads({});
    expect(leads).toHaveLength(2);
    expect(leads[0]?.fullName).toBe("Luis Gómez");
    expect(leads[1]?.fullName).toBe("Ana Pérez");
  });

  it("filtra por plan y por texto", async () => {
    await insertLead({
      fullName: "Ana Pérez",
      email: "ana@example.com",
      planId: "tracker",
    });
    await insertLead({
      fullName: "Luis Gómez",
      email: "luis@example.com",
      planId: "s10",
    });

    const byPlan = await listLeads({ planId: "tracker" });
    expect(byPlan).toHaveLength(1);
    expect(byPlan[0]?.email).toBe("ana@example.com");

    const byName = await listLeads({ q: "Luis" });
    expect(byName).toHaveLength(1);
    expect(byName[0]?.planId).toBe("s10");

    const byEmail = await listLeads({ q: "ana@" });
    expect(byEmail).toHaveLength(1);
  });
});
