import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import SrovnaniClient from "@/components/tools/SrovnaniClient";

export const metadata: Metadata = {
  title: `Srovnání AI nástrojů — porovnej 2–3 nástroje vedle sebe | ${site.name}`,
  description:
    "Interaktivní srovnávací matice AI nástrojů. Vyber 2–3 nástroje a porovnej cenu, češtinu, free tier, funkce a GDPR přímo vedle sebe.",
};

function LoadingFallback() {
  return (
    <div className="bg-white border border-surface-200 rounded-2xl p-8 text-center text-surface-400 animate-pulse">
      Načítám srovnávač…
    </div>
  );
}

export default function SrovnaniNastrojuPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Domů</Link>
        <span>/</span>
        <Link href="/nastroje" className="hover:text-brand-600 transition-colors">AI Nástroje</Link>
        <span>/</span>
        <span className="text-surface-600">Srovnání</span>
      </nav>

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">
          Interaktivní srovnání
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900">
          ⚖️ Srovnání AI nástrojů
        </h1>
        <p className="mt-2 text-surface-500 max-w-xl">
          Vyber 2–3 nástroje a porovnej je přímo vedle sebe — cena, čeština, free tier, funkce a GDPR.
        </p>
      </header>

      {/* Suspense wraps the client component that uses useSearchParams */}
      <Suspense fallback={<LoadingFallback />}>
        <SrovnaniClient />
      </Suspense>
    </div>
  );
}
