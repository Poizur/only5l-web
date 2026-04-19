import Link from "next/link";

/**
 * Featured interactive hooks for above-the-fold homepage discovery.
 *
 * Solves the homepage-discovery problem flagged 19.4.2026: 4 interactive features
 * (test-urovne + 3 kalkulačky) were buried in nav, yielding 0 entry clicks.
 * Pattern: engagement first, content second.
 *
 * Layout:
 *   - Featured test card (full width, prominent) — highest-intent entry point
 *   - 3 calculator cards (3-col grid, equal weight)
 * Mobile: stacked vertically.
 */

const CALCULATORS = [
  {
    slug: "ktery-nastroj",
    icon: "🤖",
    title: "Který AI nástroj je pro mě nejlepší?",
    description: "Odpověz na 6 otázek o tvé práci a rozpočtu. Dostaneš osobní doporučení + alternativy.",
    meta: "~2 min • 6 otázek",
    href: "/kalkulacka/ktery-nastroj",
  },
  {
    slug: "porovnani-cen",
    icon: "💰",
    title: "Porovnání cen AI nástrojů",
    description: "Přehledné srovnání plánů ChatGPT, Claude, Gemini a dalších. Ceny v Kč.",
    meta: "Aktualizováno měsíčně",
    href: "/kalkulacka/porovnani-cen",
  },
  {
    slug: "uspora-s-ai",
    icon: "⏱️",
    title: "Kolik ušetříš s AI?",
    description: "Zadej typ práce a počet hodin. Uvidíš realistickou úsporu času i peněz.",
    meta: "~1 min • ROI kalkulačka",
    href: "/kalkulacka/uspora-s-ai",
  },
] as const;


export default function InteractiveHooks() {
  return (
    <section aria-labelledby="interactive-heading">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">
          Začni tady
        </p>
        <h2
          id="interactive-heading"
          className="text-2xl sm:text-3xl font-bold text-surface-900"
        >
          Zjisti co potřebuješ — interaktivně
        </h2>
        <p className="mt-2 text-surface-600 max-w-2xl">
          Místo čtení hodin článků: test za 2 minuty nebo kalkulačka. Dostaneš osobní odpověď.
        </p>
      </div>

      {/* Featured test card — full width, prominent */}
      <Link
        href="/test-urovne"
        className="group relative block rounded-3xl overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 p-8 sm:p-10 text-white shadow-lg hover:shadow-2xl transition-all mb-6 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-300"
        aria-label="Test úrovně AI — spustit za 2 minuty"
      >
        {/* Decorative background circles */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"
        />

        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl sm:text-6xl">
              🎯
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Doporučujeme začít tady
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-2">
              Zjisti svou AI úroveň
            </h3>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-4 max-w-xl">
              Test za 2 minuty. 15 otázek o ChatGPT, promptech a bezpečnosti.
              Dostaneš diagnostiku + personalizovaný plán čtení.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/75">
              <span>⏱️ ~2 min</span>
              <span>📝 15 otázek</span>
              <span>🎓 3 úrovně</span>
            </div>
          </div>

          <div className="flex-shrink-0 hidden md:flex items-center">
            <span className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-6 py-3 rounded-xl group-hover:gap-3 transition-all text-base">
              Spustit test
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>

        {/* Mobile CTA — visible only below md */}
        <div className="relative md:hidden mt-6">
          <span className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-5 py-2.5 rounded-xl text-sm">
            Spustit test
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </Link>

      {/* Calculator cards — 3-col grid on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CALCULATORS.map((calc) => (
          <Link
            key={calc.slug}
            href={calc.href}
            className="group relative block rounded-2xl bg-white border border-surface-200 p-6 hover:border-brand-300 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-2xl group-hover:bg-brand-100 transition-colors">
                {calc.icon}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-surface-400 pt-2">
                Kalkulačka
              </span>
            </div>

            <h3 className="font-bold text-surface-900 text-lg leading-snug mb-2 group-hover:text-brand-600 transition-colors">
              {calc.title}
            </h3>
            <p className="text-surface-600 text-sm leading-relaxed mb-4">
              {calc.description}
            </p>

            <div className="flex items-center justify-between text-xs text-surface-500">
              <span>{calc.meta}</span>
              <span className="font-semibold text-brand-600 group-hover:gap-2 transition-all flex items-center gap-1">
                Spustit →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
