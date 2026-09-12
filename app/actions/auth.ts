"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
  verifyAdminCredentials,
} from "@/lib/session";
import { loginSchema } from "@/lib/validations";

export type LoginState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function loginAdmin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= [];
      fieldErrors[key].push(issue.message);
    }
    return {
      status: "error",
      message: "Completá usuario y contraseña.",
      fieldErrors,
    };
  }

  const ok = verifyAdminCredentials(parsed.data.username, parsed.data.password);
  if (!ok) {
    return {
      status: "error",
      message: "Usuario o contraseña incorrectos.",
    };
  }

  const token = await createSessionToken(parsed.data.username);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, sessionCookieOptions);
  redirect("/admin");
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
