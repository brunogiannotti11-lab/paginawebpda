import Image from "next/image";
import { LeadForm } from "@/components/lead-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatARS, PLANS, PRICE_AS_OF } from "@/lib/plans";

export const dynamic = "force-static";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ficha de Plan",
  description:
    "Asesoramiento independiente para planes de ahorro Chevrolet en Argentina.",
  areaServed: "AR",
  availableLanguage: "es",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:4317",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-chrome/20 px-5 py-16 md:px-10 md:py-24">
          <p
            aria-hidden
            className="pointer-events-none absolute -right-6 top-8 font-heading text-[28vw] leading-none text-chrome/[0.07] md:top-0 md:text-[18vw]"
          >
            ONIX
          </p>
          <div className="relative grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="max-w-2xl">
              <h1 className="text-5xl leading-[0.95] text-paper md:text-7xl">
                Un auto. Una cuota. Sin el circo del patio.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-chrome">
                Te armamos la ficha del plan Chevrolet que estás mirando. Onix,
                Onix Plus, Tracker, Montana o S10. Dejás nombre, mail y modelo:
                te escribimos con números reales, no con un folleto.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#ficha"
                  className="inline-flex h-12 items-center bg-lamp px-5 font-heading text-lg text-asphalt"
                >
                  Dejar ficha
                </a>
                <a
                  href="#modelos"
                  className="inline-flex h-12 items-center border border-chrome/30 px-5 font-heading text-lg text-paper"
                >
                  Ver modelos
                </a>
              </div>
            </div>

            <aside
              id="ficha"
              className="relative bg-paper px-6 py-7 text-ink shadow-[12px_16px_0_0_#0d0c09]"
            >
              <p className="font-heading text-3xl leading-none">Solicitud</p>
              <p className="mt-2 mb-6 text-[0.95rem] leading-6 text-ink/70">
                Tres datos. El resto lo vemos por mail.
              </p>
              <LeadForm />
            </aside>
          </div>
        </section>

        <section id="modelos" className="px-5 py-16 md:px-10 md:py-20">
          <h2 className="text-4xl text-paper md:text-5xl">Los planes que fichamos</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-chrome">
            Lista de Plan Chevrolet al {PRICE_AS_OF}. Los precios y la cuota 1
            son referenciales: los confirma el plan oficial el día que te
            anotes.
          </p>
          <ul className="mt-10 divide-y divide-chrome/20 border-y border-chrome/20">
            {PLANS.map((plan, index) => (
              <li
                key={plan.id}
                className="grid gap-6 py-8 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:items-center"
              >
                <div className="relative aspect-[2/1] bg-lacquer">
                  <Image
                    src={plan.image}
                    alt={`${plan.name} ${plan.version}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 288px"
                    priority={index === 0}
                    className="object-contain p-3"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-4xl text-paper">{plan.name}</h3>
                  <p className="mt-1 text-sm text-lamp">
                    {plan.version} · {plan.kind}
                  </p>
                  <p className="mt-3 text-lg text-paper">{plan.finance}</p>
                  <p className="mt-1 text-chrome">
                    Cuota 1 {formatARS(plan.cuota1)} · desde{" "}
                    {formatARS(plan.priceFrom)}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-chrome">
                    {plan.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href={plan.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-chrome underline-offset-4 hover:text-paper hover:underline"
                  >
                    Ficha oficial
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-10 border-t border-chrome/20 px-5 py-16 md:grid-cols-2 md:px-10">
          <div>
            <h2 className="text-4xl text-paper">Cómo sigue</h2>
            <ol className="mt-6 space-y-5 text-lg leading-8 text-chrome">
              <li>
                <span className="text-paper">Dejás la ficha.</span> Nombre, email
                y el plan que te late.
              </li>
              <li>
                <span className="text-paper">Te escribimos.</span> Orientación de
                cuota, anticipo y tiempos. Sin compromiso de firma.
              </li>
              <li>
                <span className="text-paper">Elegís si seguís.</span> Si cierra,
                te pasamos al canal oficial del plan.
              </li>
            </ol>
          </div>
          <div>
            <h2 className="text-4xl text-paper">Preguntas cortas</h2>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="font-heading text-2xl text-paper">
                  ¿Esto es Chevrolet oficial?
                </dt>
                <dd className="mt-2 leading-7 text-chrome">
                  No. Somos un mostrador independiente. El contrato lo firma el
                  plan o el concesionario, no este sitio.
                </dd>
              </div>
              <div>
                <dt className="font-heading text-2xl text-paper">
                  ¿Me van a llamar a las 8 de la mañana?
                </dt>
                <dd className="mt-2 leading-7 text-chrome">
                  No. Usamos el email que dejes. Si hace falta un llamado, lo
                  coordinamos.
                </dd>
              </div>
              <div>
                <dt className="font-heading text-2xl text-paper">
                  ¿Puedo pedir más de un modelo?
                </dt>
                <dd className="mt-2 leading-7 text-chrome">
                  Mandá la ficha con el que más te cierra. En el mail decimos
                  alternativas si el cupo no da.
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
