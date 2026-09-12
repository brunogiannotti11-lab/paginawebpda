"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = { status: "idle" };

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} className="grid gap-6" noValidate>
      <div className="grid gap-1">
        <label htmlFor="username" className="text-sm text-ink/70">
          Usuario
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          className="ficha-field"
          aria-invalid={Boolean(state.fieldErrors?.username)}
        />
      </div>
      <div className="grid gap-1">
        <label htmlFor="password" className="text-sm text-ink/70">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="ficha-field"
          aria-invalid={Boolean(state.fieldErrors?.password)}
        />
      </div>
      {state.status === "error" && state.message ? (
        <p className="text-sm text-[var(--brake)]" role="alert">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-12 bg-ink px-5 font-heading text-lg tracking-wide text-paper disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar al mostrador"}
      </button>
    </form>
  );
}
