import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { submitLead } from "@/app/actions/leads";
import { closeDbForTests, listLeads } from "@/lib/db";

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    data.set(key, value);
  }
  return data;
}

describe("submitLead", () => {
  let dir: string;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "ficha-action-"));
    process.env.TURSO_DATABASE_URL = `file:${path.join(dir, "leads.db")}`;
    delete process.env.TURSO_AUTH_TOKEN;
    closeDbForTests();
  });

  afterEach(() => {
    closeDbForTests();
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("guarda una ficha válida", async () => {
    const result = await submitLead(
      { status: "idle" },
      form({
        fullName: "Marina López",
        email: "marina.lopez@example.com",
        planId: "montana",
      }),
    );

    expect(result.status).toBe("success");
    expect(result.message).toContain("marina.lopez@example.com");

    const leads = await listLeads({});
    expect(leads).toHaveLength(1);
    expect(leads[0]).toMatchObject({
      fullName: "Marina López",
      email: "marina.lopez@example.com",
      planId: "montana",
    });
  });

  it("no guarda si faltan datos", async () => {
    const result = await submitLead(
      { status: "idle" },
      form({
        fullName: "X",
        email: "malo",
        planId: "cruze",
      }),
    );

    expect(result.status).toBe("error");
    expect(result.fieldErrors?.fullName).toBeDefined();
    expect(result.fieldErrors?.email).toBeDefined();
    expect(result.fieldErrors?.planId).toBeDefined();
    await expect(listLeads({})).resolves.toHaveLength(0);
  });
});
