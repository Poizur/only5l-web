import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import AiIndexChart from "@/components/ui/AiIndexChart";
import aiIndexData from "@/data/ai-index.json";

export const metadata: Metadata = {
  title: `AI Adoption Index ČR | ${site.name}`,
  description:
    "Měsíční index adopce AI v České republice — skóre 0–100 ze čtenářských průzkumů, GSC dat a affiliate kliků. Aktualizace vždy 1. v měsíci.",
};

const BREAKDOWN_COLORS: Record<string, { bar: string; bg: string; text: string }> = {
  adoption:         { bar: "bg-brand-500",  bg: "bg-brand-50",  text: "text-brand-700"  },
  awareness:        { bar: "bg-violet-500", bg: "bg-violet-50", text: "text-violet-700" },
  usage_intensity:  { bar: "bg-green-500",  bg: "bg-green-50",  text: "text-green-700"  },
  tool_diversity:   { bar: "bg-amber-500",  bg: "bg-amber-50",  text: "text-amber-700"  },
  professional_use: { bar: "bg-rose-500",   bg: "bg-rose-50",   text: "text-rose-700"   },
};

export default function AiIndexPage() {
  const { current, history, data_sources, methodology } = aiIndexData;
  const change = current.change_vs_prev;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Domů</Link>
        <span>/</span>
        <span className="text-surface-600">AI Adoption Index</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="text-4xl mb-3">📊</div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">Měsíční data</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900">
          AI Adoption Index ČR
        </h1>
        <p className="mt-2 text-surface-500 max-w-2xl">
          Jak rychle Češi adoptují AI nástroje? Kombinujeme čtenářské průzkumy,
          GSC data a affiliate kliky do jednoho čísla. Aktualizujeme 1. každého měsíce.
        </p>
      </header>

      {/* Score hero */}
      <div className="mb-10 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-surface-50 px-8 py-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-1">
            Aktuální skóre — {current.month}
          </p>
          <div className="flex items-end gap-3">
            <span className="text-7xl font-extrabold text-surface-900 leading-none">{current.score}</span>
            <span className="text-2xl text-surface-400 mb-2">/ 100</span>
          </div>
          <div className={`mt-2 inline-flex items-center gap-1 text-sm font-semibold rounded-full px-3 py-1 ${
            change > 0
              ? "bg-green-100 text-green-700"
              : change < 0
              ? "bg-red-100 text-red-700"
              : "bg-surface-100 text-surface-600"
          }`}>
            {change > 0 ? "▲" : change < 0 ? "▼" : "="} {Math.abs(change)} vs. předchozí měsíc
          </div>
        </div>

        {/* Gauge — simple arc SVG */}
        <div className="shrink-0">
          <svg viewBox="0 0 160 90" className="w-40 h-24" aria-hidden>
            {/* Background arc */}
            <path
              d="M 20 80 A 60 60 0 0 1 140 80"
              fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round"
            />
            {/* Score arc — dasharray trick: circumference of semicircle = π*60 ≈ 188.5 */}
            <path
              d="M 20 80 A 60 60 0 0 1 140 80"
              fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={`${(current.score / 100) * 188.5} 188.5`}
            />
            <text x="80" y="72" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0f172a">
              {current.score}
            </text>
            <text x="80" y="86" textAnchor="middle" fontSize="10" fill="#94a3b8">z 100</text>
          </svg>
        </div>
      </div>

      {/* Breakdown */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-900 mb-4">5 dimenzí indexu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(current.breakdown).map(([key, dim]) => {
            const colors = BREAKDOWN_COLORS[key] ?? { bar: "bg-surface-400", bg: "bg-surface-50", text: "text-surface-700" };
            return (
              <div key={key} className={`rounded-xl border border-surface-200 ${colors.bg} p-4`}>
                <p className={`text-xs font-semibold uppercase tracking-wide ${colors.text} mb-2`}>
                  {dim.label}
                </p>
                <p className="text-3xl font-extrabold text-surface-900 mb-2">{dim.score}</p>
                <div className="w-full bg-surface-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${colors.bar}`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chart */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-900 mb-4">Vývoj v čase</h2>
        <div className="rounded-2xl border border-surface-200 bg-white p-4 sm:p-6">
          <AiIndexChart history={history} currentScore={current.score} />
        </div>
        <p className="mt-2 text-xs text-surface-400 text-right">
          Data od ledna 2025. Aktualizace 1. každého měsíce.
        </p>
      </section>

      {/* Data sources */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-surface-900 mb-4">Datové zdroje</h2>
        <ul className="space-y-2">
          {data_sources.map((src) => (
            <li key={src} className="flex items-start gap-2 text-surface-600">
              <span className="text-brand-500 mt-0.5 shrink-0">✓</span>
              {src}
            </li>
          ))}
        </ul>
      </section>

      {/* Methodology */}
      <section className="mb-12 rounded-xl border border-surface-200 bg-surface-50 px-6 py-5">
        <h2 className="text-base font-bold text-surface-900 mb-2">Metodologie</h2>
        <p className="text-sm text-surface-600 leading-relaxed">{methodology}</p>
      </section>

      {/* CTA */}
      <div className="rounded-2xl bg-surface-900 px-8 py-10 text-center">
        <p className="text-2xl font-extrabold text-white mb-2">Přispěj do průzkumu</p>
        <p className="text-surface-400 mb-6 max-w-md mx-auto">
          Tvoje odpovědi pomáhají zpřesnit index. 3 otázky, 90 sekund.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          📬 Odebírat měsíční AI report
        </Link>
      </div>
    </div>
  );
}
