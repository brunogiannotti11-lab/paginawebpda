import { describe, expect, it } from "vitest";
import { formatARS, getPlanName, PLAN_IDS, PLANS } from "@/lib/plans";

describe("plans", () => {
  it("expone el catálogo vigente de Plan Chevrolet", () => {
    expect([...PLAN_IDS]).toEqual([
      "onix",
      "onix-plus",
      "tracker",
      "montana",
      "s10",
    ]);
    expect(PLANS).toHaveLength(5);
  });

  it("devuelve el nombre o el id si no está", () => {
    expect(getPlanName("onix-plus")).toBe("Onix Plus");
    expect(getPlanName("cruze")).toBe("cruze");
  });

  it("formatea pesos argentinos", () => {
    expect(formatARS(247_621)).toMatch(/247/);
    expect(formatARS(32_782_900)).toMatch(/32/);
  });
});
