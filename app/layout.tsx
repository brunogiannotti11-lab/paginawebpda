import type { Metadata } from "next";
import { Archivo_Narrow, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const display = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:4317";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ficha de Plan | Planes de ahorro Chevrolet",
    template: "%s | Ficha de Plan",
  },
  description:
    "Asesoramiento independiente para planes de ahorro Chevrolet en Argentina. Dejá nombre, email y el modelo que te interesa: Onix, Tracker, Cruze, Montana, S10 o Spin.",
  keywords: [
    "planes de ahorro Chevrolet",
    "plan Chevrolet Argentina",
    "Onix plan de ahorro",
    "Tracker plan de ahorro",
    "ficha Chevrolet",
  ],
  openGraph: {
    title: "Ficha de Plan | Planes de ahorro Chevrolet",
    description:
      "Sitio independiente para pedir una ficha de plan Chevrolet. Sin patio, sin vuelta.",
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
