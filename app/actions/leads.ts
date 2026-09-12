"use server";

import { insertLead } from "@/lib/db";
import { leadSchema } from "@/lib/validations";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const parsed = leadSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    planId: formData.get("planId"),
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
      message: "Revisá los datos de la ficha.",
      fieldErrors,
    };
  }

  try {
    await insertLead(parsed.data);
    return {
      status: "success",
      message: `Ficha enviada. Te vamos a escribir a ${parsed.data.email}.`,
    };
  } catch {
    return {
      status: "error",
      message: "No pudimos guardar la ficha. Probá de nuevo.",
    };
  }
}
