export const PLANS = [
  {
    id: "onix",
    name: "Onix",
    kind: "Hatch",
    line: "El compacto para el día a día. Cuota chica, ciudad y ruta corta.",
  },
  {
    id: "tracker",
    name: "Tracker",
    kind: "SUV",
    line: "Altura, baúl y familia. El más pedido en el patio.",
  },
  {
    id: "cruze",
    name: "Cruze",
    kind: "Sedán",
    line: "Sedán de ruta. Más chasis, menos show.",
  },
  {
    id: "montana",
    name: "Montana",
    kind: "Pickup chica",
    line: "Caja útil sin pasarse de medida. Comercio y fin de semana.",
  },
  {
    id: "s10",
    name: "S10",
    kind: "Pickup",
    line: "Trabajo pesado. La ficha más larga del mostrador.",
  },
  {
    id: "spin",
    name: "Spin",
    kind: "Monovolumen",
    line: "Tres filas. Colegio, valijas y un perro en el medio.",
  },
] as const;

export type PlanId = (typeof PLANS)[number]["id"];

export const PLAN_IDS = PLANS.map((plan) => plan.id) as [PlanId, ...PlanId[]];

export function getPlan(id: string) {
  return PLANS.find((plan) => plan.id === id);
}

export function getPlanName(id: string) {
  return getPlan(id)?.name ?? id;
}
