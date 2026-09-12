"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/leads";
import { PLANS } from "@/lib/plans";

const initialState: LeadFormState = { status: "idle" };

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [state, action, pending] = useActionState(submitLead, initialState);

  if (state.status === "success") {
    return (
      <div className="grid gap-3" role="status">
        <p className="font-heading text-3xl text-ink">Lista.</p>
        <p className="max-w-sm text-[1.05rem] leading-7 text-ink/80">
          {state.message}
        </p>
        <p className="text-sm text-ink/60">
          Si no llega el mail, mirá spam o escribínos de nuevo con otro correo.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-6" noValidate>
      <div className="grid gap-1">
        <label htmlFor="fullName" className="text-sm text-ink/70">
          Nombre completo
        </label>
        <input
          id="fullName"
          name="fullName"
          autoComplete="name"
          required
          minLength={3}
          placeholder="Laura Pérez"
          aria-invalid={Boolean(state.fieldErrors?.fullName)}
          aria-describedby={state.fieldErrors?.fullName ? "fullName-error" : undefined}
          className="ficha-field"
        />
        {state.fieldErrors?.fullName ? (
          <p id="fullName-error" className="text-sm text-[var(--brake)]">
            {state.fieldErrors.fullName[0]}
          </p>
        ) : null}
      </div>

      <div className="grid gap-1">
        <label htmlFor="email" className="text-sm text-ink/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="laura@correo.com"
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className="ficha-field"
        />
        {state.fieldErrors?.email ? (
          <p id="email-error" className="text-sm text-[var(--brake)]">
            {state.fieldErrors.email[0]}
          </p>
        ) : null}
      </div>

      <div className="grid gap-1">
        <label htmlFor="planId" className="text-sm text-ink/70">
          Plan que te interesa
        </label>
        <select
          id="planId"
          name="planId"
          required
          defaultValue=""
          aria-invalid={Boolean(state.fieldErrors?.planId)}
          aria-describedby={state.fieldErrors?.planId ? "planId-error" : undefined}
          className="ficha-field ficha-select"
        >
          <option value="" disabled>
            Elegí un modelo
          </option>
          {PLANS.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name} — {plan.version}
            </option>
          ))}
        </select>
        {state.fieldErrors?.planId ? (
          <p id="planId-error" className="text-sm text-[var(--brake)]">
            {state.fieldErrors.planId[0]}
          </p>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <p className="text-sm text-[var(--brake)]" role="alert">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-12 bg-ink px-5 font-heading text-lg tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Guardando ficha…" : compact ? "Enviar ficha" : "Dejar ficha"}
      </button>
    </form>
  );
}
