export const PRICE_AS_OF = "1/9/2026";

export const PLANS = [
  {
    id: "onix",
    name: "Onix",
    version: "LT MT",
    kind: "Hatch",
    finance: "80% en 120 cuotas",
    priceFrom: 32_782_900,
    cuota1: 247_621,
    highlights: ["6 airbags", "MyLink de 8 pulgadas", "OnStar y Wi-Fi a bordo"],
    image: "/vehicles/onix.png",
    sourceUrl: "https://www.chevrolet.com.ar/plan-chevrolet/onix",
  },
  {
    id: "onix-plus",
    name: "Onix Plus",
    version: "LT MT Turbo",
    kind: "Sedán",
    finance: "100% en 84 cuotas",
    priceFrom: 32_782_900,
    cuota1: 442_179,
    highlights: ["Turbo 116 cv", "Baúl de 500 litros", "OnStar y 6 airbags"],
    image: "/vehicles/onix-plus.png",
    sourceUrl: "https://www.chevrolet.com.ar/plan-chevrolet/onix-plus",
  },
  {
    id: "tracker",
    name: "Tracker",
    version: "LT AT Turbo",
    kind: "SUV",
    finance: "80% en 120 cuotas",
    priceFrom: 40_945_900,
    cuota1: 309_279,
    highlights: ["6 airbags", "Turbo 132 cv y caja AT6", "OnStar y Wi-Fi a bordo"],
    image: "/vehicles/tracker.jpeg",
    sourceUrl: "https://www.chevrolet.com.ar/plan-chevrolet/tracker",
  },
  {
    id: "montana",
    name: "Montana",
    version: "LT AT",
    kind: "Pickup",
    finance: "80% en 120 cuotas",
    priceFrom: 41_254_900,
    cuota1: 311_613,
    highlights: ["Motor 1.2 turbo", "MyLink de 11 pulgadas", "Caja Multi-Flex"],
    image: "/vehicles/montana.jpg",
    sourceUrl: "https://www.chevrolet.com.ar/plan-chevrolet/montana",
  },
  {
    id: "s10",
    name: "S10",
    version: "CD 2.8 TD 4x2 WT",
    kind: "Pickup",
    finance: "100% en 84 cuotas",
    priceFrom: 49_818_900,
    cuota1: 671_963,
    highlights: ["Turbo diésel 2.8", "6 airbags y control de estabilidad", "OnStar y Wi-Fi a bordo"],
    image: "/vehicles/s10.jpg",
    sourceUrl: "https://www.chevrolet.com.ar/plan-chevrolet/s10",
  },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];
export type Plan = (typeof PLANS)[number];

export const PLAN_IDS = PLANS.map((plan) => plan.id) as [PlanId, ...PlanId[]];

export function getPlan(id: string) {
  return PLANS.find((plan) => plan.id === id);
}

export function getPlanName(id: string) {
  return getPlan(id)?.name ?? id;
}

const ars = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatARS(value: number) {
  return ars.format(value);
}
