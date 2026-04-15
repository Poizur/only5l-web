import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import BenchmarkClient from "@/components/benchmark/BenchmarkClient";
import benchmarkData from "@/data/benchmarks.json";

export const metadata: Metadata = {
  title: `AI Benchmark — testujeme nástroje v češtině | ${site.name}`,
  description:
    "Měsíční benchmark top 5 AI nástrojů (ChatGPT, Claude, Gemini, Perplexity, Copilot) na 10 standardizovaných úkolech v češtině. Skóre 0–100.",
};

export default function BenchmarkPage() {
  const { tasks, tools, history, updated_at, month } = benchmarkData;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Domů</Link>
        <span>/</span>
        <span className="text-surface-600">Benchmark</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="text-4xl mb-3">🏆</div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">
          Měsíční testování
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900">
          AI Benchmark v češtině
        </h1>
        <p className="mt-2 text-surface-500 max-w-2xl">
          Každý měsíc testujeme ChatGPT, Claude, Gemini, Perplexity a Copilot na
          stejných&nbsp;10 úkolech v češtině. Hodnotíme kvalitu, přesnost a přirozenost
          výstupu. Každý úkol 1–10 bodů.
        </p>
      </header>

      {/* Methodology strip */}
      <div className="mb-10 flex flex-wrap gap-3">
        {[
          { icon: "🎯", text: "10 standardizovaných úkolů" },
          { icon: "📝", text: "Hodnocení 1–10 bodů" },
          { icon: "🇨🇿", text: "Výhradně česky" },
          { icon: "🔄", text: "Aktualizace 15. každého měsíce" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-sm text-surface-600 bg-surface-50 border border-surface-200 rounded-full px-4 py-1.5">
            <span>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      {/* Main benchmark table — client component for sorting */}
      <BenchmarkClient
        tasks={tasks}
        tools={tools}
        history={history}
        updatedAt={updated_at}
        month={month}
      />

      {/* Score legend */}
      <div className="mt-8 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-green-100 border border-green-200 inline-block" />
          <span className="text-surface-600">9–10 bodů — výborný výsledek</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-amber-50 border border-amber-200 inline-block" />
          <span className="text-surface-600">7–8 bodů — dobrý výsledek</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-red-50 border border-red-200 inline-block" />
          <span className="text-surface-600">1–6 bodů — slabý výsledek</span>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs text-surface-400">
        Testy provádíme na bezplatné nebo standardní placené vrstvě každého nástroje.
        AI modely se průběžně aktualizují — výsledky mohou kolísat i bez změny produktu.
        Klikni na záhlaví sloupce pro seřazení podle úkolu.
      </p>

      {/* CTA */}
      <div className="mt-16 rounded-2xl bg-surface-900 px-8 py-10 text-center">
        <p className="text-2xl font-extrabold text-white mb-2">Dostávej výsledky každý měsíc</p>
        <p className="text-surface-400 mb-6 max-w-md mx-auto">
          Benchmarky + 5 nejdůležitějších AI novinek. Každý pátek, zdarma.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          📬 Přihlásit se k newsletteru
        </Link>
      </div>
    </div>
  );
}
