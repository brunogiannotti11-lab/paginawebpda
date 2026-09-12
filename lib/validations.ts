import { z } from "zod";
import { PLAN_IDS } from "@/lib/plans";

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Escribí nombre y apellido")
    .max(120, "El nombre es demasiado largo"),
  email: z.email("Ese email no se entiende"),
  planId: z.enum(PLAN_IDS, { error: "Elegí un plan" }),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Falta el usuario"),
  password: z.string().min(1, "Falta la contraseña"),
});

export type LeadInput = z.infer<typeof leadSchema>;
