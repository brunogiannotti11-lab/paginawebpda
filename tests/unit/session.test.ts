import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("session", () => {
  beforeEach(() => {
    vi.stubEnv("ADMIN_USER", "admin-test");
    vi.stubEnv("ADMIN_PASSWORD", "clave-test");
    vi.stubEnv("SESSION_SECRET", "secreto-de-prueba-32chars");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("acepta las credenciales del entorno", async () => {
    const { verifyAdminCredentials } = await import("@/lib/session");
    expect(verifyAdminCredentials("admin-test", "clave-test")).toBe(true);
  });

  it("rechaza usuario o contraseña incorrectos", async () => {
    const { verifyAdminCredentials } = await import("@/lib/session");
    expect(verifyAdminCredentials("otro", "clave-test")).toBe(false);
    expect(verifyAdminCredentials("admin-test", "otra")).toBe(false);
  });

  it("firma y lee un token de sesión", async () => {
    const { createSessionToken, readSessionToken } = await import("@/lib/session");
    const token = await createSessionToken("admin-test");
    await expect(readSessionToken(token)).resolves.toEqual({
      username: "admin-test",
    });
  });

  it("devuelve null si el token es inválido o falta", async () => {
    const { readSessionToken } = await import("@/lib/session");
    await expect(readSessionToken(undefined)).resolves.toBeNull();
    await expect(readSessionToken("no-es-jwt")).resolves.toBeNull();
  });
});
