import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/article/ArticleCard";
import { getArticlesByCategory, getAllCategories } from "@/lib/articles";
import { site } from "@/lib/site";
import Link from "next/link";

interface Props {
  params: Promise<{ category: string }>;
}

const STATIC_CATEGORIES = ["recenze", "srovnani", "navody", "zacatky", "profese", "breaking"];

const CATEGORY_META: Record<string, { label: string; description: string; icon: string }> = {
  recenze:  { label: "Recenze",        description: "Poctivé recenze AI nástrojů — co funguje, co ne a kolik to stojí.",             icon: "⭐" },
  srovnani: { label: "Srovnání",       description: "Porovnáváme nástroje mezi sebou, aby ses nemusel/a rozhodovat naslepo.",         icon: "⚖️" },
  navody:   { label: "Návody",         description: "Jak začít s AI od nuly — krok za krokem, bez technického žargonu.",              icon: "🎓" },
  zacatky:  { label: "Začínám s AI",   description: "Kompletní vzdělávací cesta od začátečníka po experta. 15 pilířových článků ve 3 úrovních.", icon: "🚀" },
  profese:  { label: "AI pro profese", description: "Konkrétní AI nástroje a postupy podle vašeho oboru — marketing, účetnictví, programování a další.", icon: "💼" },
  breaking: { label: "Breaking News",  description: "Nejčerstvější zprávy ze světa AI — nové modely, launche, acquisice. Publikováno do 2 hodin od zprávy.", icon: "🔴" },
};

// ── Pillar slugs for Začínám s AI (3 levels) ─────────────────────────────────
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

// ── Reusable level section (rendered server-side, all classes are literals) ───
function LevelSection({
  levelNum,
  icon,
  title,
  subtitle,
  description,
  slugs,
  articleMap,
  dotCls,
  headerCls,
  badgeCls,
  progressCls,
  borderCls,
}: {
  levelNum: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  slugs: readonly string[];
  articleMap: ArticleMap;
  dotCls: string;
  headerCls: string;
  badgeCls: string;
  progressCls: string;
  borderCls: string;
}) {
  const found = slugs.filter((s) => s in articleMap).length;
  const pct = Math.round((found / slugs.length) * 100);

  return (
    <section>
      {/* Level header */}
      <div className={`rounded-2xl border ${borderCls} ${headerCls} px-6 py-5 mb-5`}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl leading-none mt-0.5">{icon}</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeCls}`}>
                  Úroveň {levelNum}
                </span>
                <h2 className="text-xl font-extrabold text-surface-900">{title}</h2>
                <span className="text-sm text-surface-500">— {subtitle}</span>
              </div>
              <p className="text-sm text-surface-600 max-w-xl">{description}</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="shrink-0 sm:text-right">
            <p className="text-xs text-surface-400 mb-1.5">{found}/{slugs.length} článků</p>
            <div className="w-32 bg-surface-100 rounded-full h-2">
              <div className={`h-2 rounded-full ${progressCls}`} style={{ width: `${pct}%` }} />
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
              <div key={slug} className="rounded-xl border border-dashed border-surface-200 p-5 flex items-center gap-3 opacity-40">
                <div className={`w-8 h-8 rounded-full ${dotCls} opacity-30 flex items-center justify-center text-white text-sm font-bold shrink-0`}>
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
              <div className={`w-8 h-8 rounded-full ${dotCls} flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5`}>
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

// ── Special Začínám s AI page ─────────────────────────────────────────────────
function ZacatkyLayout({ articles }: { articles: ReturnType<typeof getArticlesByCategory> }) {
  const articleMap: ArticleMap = Object.fromEntries(
    articles.map((a) => [a.slug, { title: a.frontmatter.title, readingTimeText: a.readingTimeText }])
  );
  const foundPillar = ALL_PILLAR_SLUGS.filter((s) => s in articleMap).length;
  const overallPct = Math.round((foundPillar / ALL_PILLAR_SLUGS.length) * 100);

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
        {/* Overall progress */}
        <div className="mt-6 max-w-md">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-surface-500">Celkový průchod</span>
            <span className="text-xs font-bold text-brand-600">{foundPillar}/{ALL_PILLAR_SLUGS.length} článků</span>
          </div>
          <div className="w-full bg-surface-100 rounded-full h-2.5">
            <div className="bg-brand-500 h-2.5 rounded-full" style={{ width: `${overallPct}%` }} />
          </div>
        </div>
      </header>

      {/* Level path indicator */}
      <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
          <span className="text-base">🌱</span>
          <div>
            <div className="text-xs font-bold text-green-700">Úroveň 1</div>
            <div className="text-xs text-surface-500">Začátečník</div>
          </div>
        </div>
        <svg className="w-5 h-5 text-surface-300 hidden sm:block shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200">
          <span className="text-base">🚀</span>
          <div>
            <div className="text-xs font-bold text-violet-700">Úroveň 2</div>
            <div className="text-xs text-surface-500">Pokročilejší</div>
          </div>
        </div>
        <svg className="w-5 h-5 text-surface-300 hidden sm:block shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
          <span className="text-base">🏆</span>
          <div>
            <div className="text-xs font-bold text-amber-700">Úroveň 3</div>
            <div className="text-xs text-surface-500">Pokročilý</div>
          </div>
        </div>
      </div>

      {/* Level sections */}
      <div className="space-y-12">
        <LevelSection
          levelNum={1}
          icon="🌱"
          title="Začátečník"
          subtitle="Úplné základy AI"
          description="Pochopíš co je AI, jak začít zdarma, která nástroje vybrat a co od nich realisticky čekat."
          slugs={LEVEL_1_SLUGS}
          articleMap={articleMap}
          dotCls="bg-green-500"
          headerCls="bg-green-50"
          badgeCls="bg-green-100 text-green-700"
          progressCls="bg-green-500"
          borderCls="border-green-200"
        />
        <LevelSection
          levelNum={2}
          icon="🚀"
          title="Pokročilejší"
          subtitle="AI v praxi"
          description="Naučíš se psát efektivní prompty, využívat AI v práci, rozumět bezpečnosti a spočítat ROI."
          slugs={LEVEL_2_SLUGS}
          articleMap={articleMap}
          dotCls="bg-violet-500"
          headerCls="bg-violet-50"
          badgeCls="bg-violet-100 text-violet-700"
          progressCls="bg-violet-500"
          borderCls="border-violet-200"
        />
        <LevelSection
          levelNum={3}
          icon="🏆"
          title="Pokročilý"
          subtitle="AI expert"
          description="Pochopíš legislativu, postavíš si vlastní workflow, nasadíš agenty a sestavíš profesní AI stack."
          slugs={LEVEL_3_SLUGS}
          articleMap={articleMap}
          dotCls="bg-amber-500"
          headerCls="bg-amber-50"
          badgeCls="bg-amber-100 text-amber-700"
          progressCls="bg-amber-500"
          borderCls="border-amber-200"
        />
      </div>

      {/* Newsletter CTA */}
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

// ── generateStaticParams & page exports ───────────────────────────────────────

export async function generateStaticParams() {
  const fromContent = getAllCategories().map((c) => ({ category: c.toLowerCase() }));
  const staticCz = STATIC_CATEGORIES.map((c) => ({ category: c }));
  const all = [...fromContent, ...staticCz];
  return all.filter((v, i, arr) => arr.findIndex((x) => x.category === v.category) === i);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: cat } = await params;
  const meta = CATEGORY_META[cat];
  return {
    title: meta ? `${meta.label} — ${site.name}` : cat.charAt(0).toUpperCase() + cat.slice(1),
    description: meta?.description ?? site.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const articles = getArticlesByCategory(category);

  // 404 only for truly unknown categories
  const knownCategories = new Set([
    ...STATIC_CATEGORIES,
    ...getAllCategories().map((c) => c.toLowerCase()),
  ]);
  if (!knownCategories.has(category)) {
    notFound();
  }

  // ── Special layout for Začínám s AI ──────────────────────────────────────
  if (category === "zacatky") {
    return <ZacatkyLayout articles={articles} />;
  }

  // ── Generic category layout ───────────────────────────────────────────────
  const meta = CATEGORY_META[category];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Domů
        </Link>
        <span>/</span>
        <span className="text-surface-600">{meta?.label ?? category}</span>
      </nav>

      <header className="mb-10">
        {meta && <div className="text-4xl mb-3">{meta.icon}</div>}
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">
          Kategorie
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900">
          {meta?.label ?? category}
        </h1>
        {meta && <p className="mt-2 text-surface-500 max-w-xl">{meta.description}</p>}
        <p className="mt-2 text-sm text-surface-400">
          {articles.length} {articles.length === 1 ? "článek" : articles.length < 5 ? "články" : "článků"}
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📝</p>
          <h2 className="text-xl font-bold text-surface-900 mb-2">Zatím žádné články</h2>
          <p className="text-surface-500">Brzy přidáme obsah do této kategorie.</p>
          <Link href="/" className="mt-6 inline-block text-brand-600 font-semibold hover:text-brand-700">
            ← Zpět na hlavní stránku
          </Link>
        </div>
      )}
    </div>
  );
}
