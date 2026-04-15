import type { Metadata } from "next";
import Link from "next/link";
import { getArticlesByCategory } from "@/lib/articles";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Začínám s AI – kompletní vzdělávací systém | ${site.name}`,
  description:
    "Kompletní vzdělávací cesta od nuly k pokročilému uživateli AI. 15 pilířových článků ve třech úrovních.",
};

const LEVEL_1_SLUGS = [
  "co-je-ai-pruvodce-pro-zacatecniky",
  "chatgpt-prvni-kroky",
  "claude-vs-chatgpt-ktery-vybrat",
  "ai-zdarma-co-dostanu",
  "co-ai-umi-a-neumi",
] as const;

const LEVEL_2_SLUGS = [
  "jak-psat-prompty-pruvodce",
  "ai-pro-praci-use-cases",
  "chatgpt-claude-gemini-kdy-pouzit",
  "ai-bezpecnost-gdpr",
  "ai-uspora-casu-a-penez",
] as const;

const LEVEL_3_SLUGS = [
  "ai-act-2026-pruvodce",
  "vlastni-ai-workflow",
  "ai-agenti-co-to-je",
  "nejlepsi-ai-stack-2026",
  "budoucnost-ai-2026",
] as const;

const ALL_PILLAR_SLUGS = [...LEVEL_1_SLUGS, ...LEVEL_2_SLUGS, ...LEVEL_3_SLUGS];

type ArticleMap = Record<string, { title: string; readingTimeText: string }>;

function LevelSection({
  levelNum,
  icon,
  title,
  subtitle,
  description,
  slugs,
  articleMap,
  dotClass,
  headerClass,
  badgeClass,
  progressClass,
  borderClass,
}: {
  levelNum: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  slugs: readonly string[];
  articleMap: ArticleMap;
  dotClass: string;
  headerClass: string;
  badgeClass: string;
  progressClass: string;
  borderClass: string;
}) {
  const found = slugs.filter((s) => s in articleMap).length;
  const pct = Math.round((found / slugs.length) * 100);

  return (
    <section>
      {/* Level header card */}
      <div className={`rounded-2xl border ${borderClass} ${headerClass} px-6 py-5 mb-5`}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl leading-none mt-0.5">{icon}</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeClass}`}>
                  Úroveň {levelNum}
                </span>
                <h2 className="text-xl font-extrabold text-surface-900">{title}</h2>
                <span className="text-sm text-surface-500">— {subtitle}</span>
              </div>
              <p className="text-sm text-surface-600 max-w-xl">{description}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="shrink-0 sm:text-right">
            <p className="text-xs text-surface-400 mb-1.5">{found}/{slugs.length} článků</p>
            <div className="w-32 bg-surface-100 rounded-full h-2">
              <div className={`h-2 rounded-full transition-all ${progressClass}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Article cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slugs.map((slug, idx) => {
          const article = articleMap[slug];
          if (!article) {
            return (
              <div
                key={slug}
                className="rounded-xl border border-dashed border-surface-200 p-5 flex items-center gap-3 opacity-40"
              >
                <div className={`w-8 h-8 rounded-full ${dotClass} opacity-30 flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {idx + 1}
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
              <div className={`w-8 h-8 rounded-full ${dotClass} flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5`}>
                {idx + 1}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-surface-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h3>
                {article.readingTimeText && (
                  <p className="mt-1 text-xs text-surface-400">{article.readingTimeText}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function ZacatkyPage() {
  const allArticles = getArticlesByCategory("zacatky");
  const articleMap: ArticleMap = Object.fromEntries(
    allArticles.map((a) => [
      a.slug,
      { title: a.frontmatter.title, readingTimeText: a.readingTimeText },
    ])
  );

  const totalPillar = ALL_PILLAR_SLUGS.length;
  const foundPillar = ALL_PILLAR_SLUGS.filter((s) => s in articleMap).length;
  const overallPct = Math.round((foundPillar / totalPillar) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Domů</Link>
        <span>/</span>
        <span className="text-surface-600">Začínám s AI</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="text-4xl mb-3">🚀</div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">Vzdělávací systém</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900">
          Začínám s AI
        </h1>
        <p className="mt-2 text-surface-500 max-w-2xl">
          Kompletní vzdělávací cesta od absolutního začátečníka po pokročilého uživatele.
          15 pilířových článků ve třech úrovních — postupuj od začátku nebo skoč přímo tam, kde jsi.
        </p>

        {/* Overall progress bar */}
        <div className="mt-6 max-w-md">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-surface-500">Celkový průchod</span>
            <span className="text-xs font-bold text-brand-600">{foundPillar}/{totalPillar} článků</span>
          </div>
          <div className="w-full bg-surface-100 rounded-full h-2.5">
            <div className="bg-brand-500 h-2.5 rounded-full transition-all" style={{ width: `${overallPct}%` }} />
          </div>
        </div>
      </header>

      {/* Learning path visual */}
      <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Level 1 pill — green */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
          <span className="text-base">🌱</span>
          <div>
            <div className="text-xs font-bold text-green-700">Úroveň 1</div>
            <div className="text-xs text-surface-500">Začátečník</div>
          </div>
        </div>
        <svg className="w-5 h-5 text-surface-300 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {/* Level 2 pill — violet */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200">
          <span className="text-base">🚀</span>
          <div>
            <div className="text-xs font-bold text-violet-700">Úroveň 2</div>
            <div className="text-xs text-surface-500">Pokročilejší</div>
          </div>
        </div>
        <svg className="w-5 h-5 text-surface-300 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {/* Level 3 pill — amber */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
          <span className="text-base">🏆</span>
          <div>
            <div className="text-xs font-bold text-amber-700">Úroveň 3</div>
            <div className="text-xs text-surface-500">Pokročilý</div>
          </div>
        </div>
      </div>

      {/* Three level sections */}
      <div className="space-y-12">
        {/* ── LEVEL 1 ── green */}
        <LevelSection
          levelNum={1}
          icon="🌱"
          title="Začátečník"
          subtitle="Úplné základy AI"
          description="Pochopíš co je AI, jak začít zdarma, která nástroje vybrat a co od nich realisticky čekat."
          slugs={LEVEL_1_SLUGS}
          articleMap={articleMap}
          dotClass="bg-green-500"
          headerClass="bg-green-50"
          badgeClass="bg-green-100 text-green-700"
          progressClass="bg-green-500"
          borderClass="border-green-200"
        />

        {/* ── LEVEL 2 ── violet */}
        <LevelSection
          levelNum={2}
          icon="🚀"
          title="Pokročilejší"
          subtitle="AI v praxi"
          description="Naučíš se psát efektivní prompty, využívat AI v práci, rozumět bezpečnosti a spočítat ROI."
          slugs={LEVEL_2_SLUGS}
          articleMap={articleMap}
          dotClass="bg-violet-500"
          headerClass="bg-violet-50"
          badgeClass="bg-violet-100 text-violet-700"
          progressClass="bg-violet-500"
          borderClass="border-violet-200"
        />

        {/* ── LEVEL 3 ── amber */}
        <LevelSection
          levelNum={3}
          icon="🏆"
          title="Pokročilý"
          subtitle="AI expert"
          description="Pochopíš legislativu, postavíš si vlastní workflow, nasadíš agenty a sestavíš profesní AI stack."
          slugs={LEVEL_3_SLUGS}
          articleMap={articleMap}
          dotClass="bg-amber-500"
          headerClass="bg-amber-50"
          badgeClass="bg-amber-100 text-amber-700"
          progressClass="bg-amber-500"
          borderClass="border-amber-200"
        />
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
