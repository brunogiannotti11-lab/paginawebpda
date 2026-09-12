import Link from "next/link";

export function SiteHeader({ admin = false }: { admin?: boolean }) {
  return (
    <header className="flex items-end justify-between gap-6 border-b border-chrome/20 px-5 py-5 md:px-10">
      <Link href="/" className="no-underline">
        <p className="font-heading text-2xl leading-none tracking-tight text-paper">
          Ficha de Plan
        </p>
        <p className="mt-1 text-sm text-chrome">
          {admin ? "Mostrador interno" : "Planes Chevrolet, asesor independiente"}
        </p>
      </Link>
      {admin ? (
        <Link href="/" className="text-sm text-chrome underline-offset-4 hover:underline">
          Volver al sitio
        </Link>
      ) : (
        <nav className="flex items-center gap-5 text-sm text-chrome">
          <a href="#modelos" className="hover:text-paper">
            Modelos
          </a>
          <a href="#ficha" className="hover:text-paper">
            Dejar ficha
          </a>
        </nav>
      )}
    </header>
  );
}
