import { describe, expect, it } from "vitest";
import { leadSchema, loginSchema } from "@/lib/validations";

describe("leadSchema", () => {
  it("acepta una ficha completa", () => {
    const parsed = leadSchema.safeParse({
      fullName: "Marina López",
      email: "marina.lopez@example.com",
      planId: "tracker",
    });
    expect(parsed.success).toBe(true);
  });

  it("rechaza un email inválido", () => {
    const parsed = leadSchema.safeParse({
      fullName: "Marina López",
      email: "no-es-mail",
      planId: "onix",
    });
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues.some((issue) => issue.path[0] === "email")).toBe(
        true,
      );
    }
  });

  it("rechaza un plan que no está en el catálogo", () => {
    const parsed = leadSchema.safeParse({
      fullName: "Marina López",
      email: "marina.lopez@example.com",
      planId: "cruze",
    });
    expect(parsed.success).toBe(false);
  });

  it("pide nombre y apellido", () => {
    const parsed = leadSchema.safeParse({
      fullName: "Al",
      email: "al@example.com",
      planId: "onix",
    });
    expect(parsed.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("rechaza usuario o contraseña vacíos", () => {
    expect(loginSchema.safeParse({ username: "", password: "x" }).success).toBe(
      false,
    );
    expect(loginSchema.safeParse({ username: "admin", password: "" }).success).toBe(
      false,
    );
  });

  it("acepta usuario y contraseña", () => {
    expect(
      loginSchema.safeParse({ username: "admin", password: "clave" }).success,
    ).toBe(true);
  });
});
