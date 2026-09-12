import { logoutAdmin } from "@/app/actions/auth";
import { SiteHeader } from "@/components/site-header";
import { listLeads } from "@/lib/db";
import { getPlanName, PLANS } from "@/lib/plans";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function formatWhen(timestamp: number) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; plan?: string }>;
}) {
  const { q, plan } = await searchParams;
  let leads: Awaited<ReturnType<typeof listLeads>> = [];
  let loadError: string | null = null;

  try {
    leads = await listLeads({ q: q?.trim() || undefined, planId: plan || undefined });
  } catch {
    loadError = "No pudimos leer las fichas. Revisá que exista data/leads.db.";
  }

  return (
    <>
      <SiteHeader admin />
      <main className="flex-1 px-5 py-10 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl text-paper md:text-5xl">Fichas ingresadas</h1>
            <p className="mt-2 text-chrome">
              {loadError
                ? "Hubo un problema al abrir el archivo."
                : leads.length === 0
                  ? "Nadie dejó ficha todavía."
                  : `${leads.length} ${leads.length === 1 ? "ficha" : "fichas"} en el mostrador.`}
            </p>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="border border-chrome/30 px-4 py-2 text-sm text-chrome hover:text-paper"
            >
              Salir
            </button>
          </form>
        </div>

        <form
          method="get"
          className="mt-8 grid gap-4 border-y border-chrome/20 py-5 md:grid-cols-[1fr_12rem_auto] md:items-end"
        >
          <label className="grid gap-1 text-sm text-chrome">
            Buscar
            <input
              name="q"
              defaultValue={q}
              placeholder="Nombre o email"
              className="h-11 border border-chrome/25 bg-transparent px-3 text-paper"
            />
          </label>
          <label className="grid gap-1 text-sm text-chrome">
            Plan
            <select
              name="plan"
              defaultValue={plan ?? ""}
              className="ficha-select h-11 border border-chrome/25 bg-asphalt px-3 text-paper"
            >
              <option value="">Todos</option>
              {PLANS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="h-11 bg-lamp px-5 font-heading text-lg text-asphalt"
          >
            Filtrar
          </button>
        </form>

        {loadError ? (
          <p className="mt-10 text-lg text-[var(--brake)]" role="alert">
            {loadError}
          </p>
        ) : leads.length === 0 ? (
          <div className="mt-12 max-w-lg">
            <p className="font-heading text-3xl text-paper">El mostrador está vacío</p>
            <p className="mt-3 leading-7 text-chrome">
              Cuando alguien complete el formulario de la web, la ficha aparece
              acá con fecha, nombre, email y plan.
            </p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-chrome/20 hover:bg-transparent">
                  <TableHead className="text-chrome">Fecha</TableHead>
                  <TableHead className="text-chrome">Nombre</TableHead>
                  <TableHead className="text-chrome">Email</TableHead>
                  <TableHead className="text-chrome">Plan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="border-chrome/15 hover:bg-lacquer/60">
                    <TableCell className="whitespace-nowrap text-chrome">
                      {formatWhen(lead.createdAt)}
                    </TableCell>
                    <TableCell className="text-paper">{lead.fullName}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-paper underline-offset-4 hover:underline"
                      >
                        {lead.email}
                      </a>
                    </TableCell>
                    <TableCell className="text-lamp">{getPlanName(lead.planId)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </>
  );
}
