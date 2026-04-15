import type { Metadata } from "next";
import Link from "next/link";
import { getArticlesByCategory } from "@/lib/articles";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Začínám s AI – kompletní vzdělávací systém | ${site.name}`,
  description:
    "Kompletní vzdělávací cesta od nuly k pokročilému uživateli AI. 15 pilířových článků ve třech úrovních – od úplného začátečníka po pokročilého.",
};

const LEVEL_1_SLUGS = [
  "co-je-ai-pruvodce-pro-zacatecniky",
  "chatgpt-prvni-kroky",
  "claude-vs-chatgpt-ktery-vybrat",
  "ai-zdarma-co-dostanu",
  "co-ai-umi-a-neumi",
];

const LEVEL_2_SLUGS = [
  "jak-psat-prompty-pruvodce",
  "ai-pro-praci-use-cases",
  "chatgpt-claude-gemini-kdy-pouzit",
  "ai-bezpecnost-gdpr",
  "ai-uspora-casu-a-penez",
];

const LEVEL_3_SLUGS = [
  "ai-act-2026-pruvodce",
  "vlastni-ai-workflow",
  "ai-agenti-co-to-je",
  "nejlepsi-ai-stack-2026",
  "budoucnost-ai-2026",
];

const LEVELS = [
  {
    number: 1,
    title: "Začátečník",
    subtitle: "Úplné základy AI",
    description: "Pochopíš co je AI, jak začít zdarma, která nástroje vybrat a co od nich realisticky čekat.",
    icon: "🌱",
    color: "brand",
    slugs: LEVEL_1_SLUGS,
    cta: "Začni tady",
  },
  {
    number: 2,
    title: "Pokročilejší",
    subtitle: "AI v praxi",
    description: "Naučíš se psát efektivní prompty, využívat AI v práci, rozumět bezpečnosti a spočítat ROI.",
    icon: "🚀",
    color: "violet",
    slugs: LEVEL_2_SLUGS,
    cta: "Přejít na úroveň 2",
  },
  {
    number: 3,
    title: "Pokročilý",
    subtitle: "AI expert",
    description: "Pochopíš legislativu, postavíš si vlastní workflow, nasadíš agenty a sestavíš profesní AI stack.",
    icon: "🏆",
    color: "amber",
    slugs: LEVEL_3_SLUGS,
    cta: "Přejít na úroveň 3",
  },
];

const LEVEL_COLOR_MAP: Record<string, { bg: string; border: string; badge: string; dot: string; progress: string }> = {
  brand: {
    bg: "bg-brand-50",
    border: "border-brand-200",
    badge: "bg-brand-100 text-brand-700",
    dot: "bg-brand-500",
    progress: "bg-brand-500",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
    dot: "bg-violet-500",
    progress: "bg-violet-500",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    progress: "bg-amber-500",
  },
};

export default function ZacatkyPage() {
  const allArticles = getArticlesByCategory("zacatky");
  const articleMap = Object.fromEntries(allArticles.map((a) => [a.slug, a]));

  const totalPillar = LEVEL_1_SLUGS.length + LEVEL_2_SLUGS.length + LEVEL_3_SLUGS.length;
  const foundPillar = [...LEVEL_1_SLUGS, ...LEVEL_2_SLUGS, ...LEVEL_3_SLUGS].filter(
    (s) => s in articleMap
  ).length;

  const progressPct = Math.round((foundPillar / totalPillar) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Domů
        </Link>
        <span>/</span>
        <span className="text-surface-600">Začínám s AI</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="text-4xl mb-3">🚀</div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">
          Vzdělávací systém
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900">
          Začínám s AI
        </h1>
        <p className="mt-2 text-surface-500 max-w-2xl">
          Kompletní vzdělávací cesta od absolutního začátečníka po pokročilého uživatele. 15 pilířových článků ve třech úrovních – postupuj od začátku nebo skoč přímo tam, kde jsi.
        </p>

        {/* Overall progress bar */}
        <div className="mt-6 max-w-md">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-surface-500">Průchod vzdělávacím systémem</span>
            <span className="text-xs font-bold text-brand-600">{foundPillar}/{totalPillar} článků</span>
          </div>
          <div className="w-full bg-surface-100 rounded-full h-2.5">
            <div
              className="bg-brand-500 h-2.5 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </header>

      {/* Learning path indicator */}
      <div className="mb-10 flex items-center gap-3 overflow-x-auto pb-2">
        {LEVELS.map((level, i) => {
          const colors = LEVEL_COLOR_MAP[level.color];
          const levelSlugs = level.slugs;
          const found = levelSlugs.filter((s) => s in articleMap).length;
          const levelPct = Math.round((found / levelSlugs.length) * 100);
          return (
            <div key={level.number} className="flex items-center gap-3 shrink-0">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${colors.bg} ${colors.border}`}>
                <span className="text-lg">{level.icon}</span>
                <div>
                  <div className={`text-xs font-bold ${colors.badge.split(" ")[1]}`}>
                    Úroveň {level.number}
                  </div>
                  <div className="text-xs text-surface-500">{levelPct}% připraveno</div>
                </div>
              </div>
              {i < LEVELS.length - 1 && (
                <svg className="w-5 h-5 text-surface-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Three level sections */}
      <div className="space-y-12">
        {LEVELS.map((level) => {
          const colors = LEVEL_COLOR_MAP[level.color];
          const levelArticles = level.slugs.map((slug) => articleMap[slug]).filter(Boolean);
          const levelPct = Math.round((levelArticles.length / level.slugs.length) * 100);

          return (
            <section key={level.number}>
              {/* Level header */}
              <div className={`rounded-2xl border ${colors.bg} ${colors.border} px-6 py-5 mb-5`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{level.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.badge}`}>
                          Úroveň {level.number}
                        </span>
                        <h2 className="text-xl font-extrabold text-surface-900">
                          {level.title}
                        </h2>
                        <span className="text-sm text-surface-500">— {level.subtitle}</span>
                      </div>
                      <p className="mt-1 text-sm text-surface-600 max-w-xl">{level.description}</p>
                    </div>
                  </div>
                  {/* Level progress */}
                  <div className="shrink-0 text-right">
                    <div className="text-xs text-surface-400 mb-1">{levelArticles.length}/{level.slugs.length} článků</div>
                    <div className="w-32 bg-surface-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${colors.progress}`}
                        style={{ width: `${levelPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Articles grid for this level */}
              {levelArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {level.slugs.map((slug, index) => {
                    const article = articleMap[slug];
                    if (!article) {
                      return (
                        <div
                          key={slug}
                          className="rounded-xl border border-dashed border-surface-200 p-5 flex items-center gap-3 opacity-50"
                        >
                          <div className={`w-8 h-8 rounded-full ${colors.dot} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                            {index + 1}
                          </div>
                          <span className="text-sm text-surface-400">Připravujeme…</span>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={slug}
                        href={`/${slug}`}
                        className="group rounded-xl border border-surface-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm transition-all flex items-start gap-3"
                      >
                        <div className={`w-8 h-8 rounded-full ${colors.dot} flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5`}>
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-surface-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
                            {article.frontmatter.title}
                          </h3>
                          {article.readingTimeText && (
                            <p className="mt-1 text-xs text-surface-400">{article.readingTimeText}</p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-surface-400 italic">Články pro tuto úroveň se připravují.</p>
              )}
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-2xl bg-surface-900 px-8 py-10 text-center">
        <p className="text-2xl font-extrabold text-white mb-2">Chceš být vždy o krok napřed?</p>
        <p className="text-surface-400 mb-6 max-w-md mx-auto">
          Každý pátek posíláme 5 nejdůležitějších AI novinek. Zdarma, bez spamu.
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
