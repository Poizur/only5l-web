import type { Metadata } from "next";
import { site } from "@/lib/site";
import { AI_TOOLS, CATEGORY_LABELS } from "@/lib/tools";
import ToolsDatabase from "@/components/tools/ToolsDatabase";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Databáze AI nástrojů — přehled ${AI_TOOLS.length}+ nástrojů s filtry | ${site.name}`,
  description: `Filtrovatelná databáze ${AI_TOOLS.length}+ AI nástrojů s cenami v USD, podporou češtiny, free tierem a GDPR info. Najdi správný nástroj pro psaní, obrázky, video, kód nebo SEO.`,
};

export default function NastrojePage() {
  const freeCount  = AI_TOOLS.filter((t) => t.freeTier).length;
  const czechCount = AI_TOOLS.filter((t) => t.czech === "ano" || t.czech === "castecne").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Domů</Link>
        <span>/</span>
        <span className="text-surface-600">AI Nástroje</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">Databáze</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900">
          🛠️ AI Nástroje
        </h1>
        <p className="mt-3 text-surface-500 max-w-2xl text-lg leading-relaxed">
          Přehled {AI_TOOLS.length}+ nejlepších AI nástrojů — testovaných, ohodnocených a porovnaných.
          Filtruj podle kategorie, ceny, češtiny a free tieru.
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap gap-4">
          {[
            { icon: "🧰", label: "Nástrojů celkem",    value: AI_TOOLS.length },
            { icon: "🆓", label: "S free plánem",       value: freeCount },
            { icon: "🇨🇿", label: "S češtinou",          value: czechCount },
            { icon: "🗂️", label: "Kategorií",           value: Object.keys(CATEGORY_LABELS).length },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5 bg-surface-50 border border-surface-200 rounded-xl px-4 py-2.5">
              <span className="text-xl">{icon}</span>
              <div>
                <div className="text-lg font-bold text-surface-900 leading-none">{value}</div>
                <div className="text-xs text-surface-400">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Compare CTA */}
      <div className="mb-8 rounded-xl bg-brand-50 border border-brand-100 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-surface-800">⚖️ Chceš porovnat nástroje přímo vedle sebe?</p>
          <p className="text-sm text-surface-500 mt-0.5">Srovnávací matice ukáže rozdíly v ceně, češtině, funkcích a GDPR.</p>
        </div>
        <Link
          href="/srovnani-nastroju"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          Porovnat nástroje →
        </Link>
      </div>

      {/* Tools database (client component with filters) */}
      <ToolsDatabase />

      {/* Disclaimer */}
      <p className="mt-10 text-xs text-surface-400 max-w-2xl">
        Ceny jsou orientační v USD/měsíc pro nejlevnější placený plán (k dubnu 2026).
        Hodnocení vychází z našich testů a uživatelských recenzí. Stránka obsahuje affiliate odkazy —{" "}
        <Link href="/disclaimer" className="underline hover:text-surface-600">přečti si disclaimer</Link>.
      </p>
    </div>
  );
}
