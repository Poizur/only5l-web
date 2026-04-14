import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/article/ArticleCard";
import { getArticlesByCategory, getAllCategories } from "@/lib/articles";
import { site } from "@/lib/site";
import Link from "next/link";

interface Props {
  params: Promise<{ category: string }>;
}

const STATIC_CATEGORIES = ["recenze", "srovnani", "navody", "zacatky", "profese"];

const CATEGORY_META: Record<string, { label: string; description: string; icon: string }> = {
  recenze:  { label: "Recenze",      description: "Poctivé recenze AI nástrojů — co funguje, co ne a kolik to stojí.",             icon: "⭐" },
  srovnani: { label: "Srovnání",     description: "Porovnáváme nástroje mezi sebou, aby ses nemusel/a rozhodovat naslepo.",         icon: "⚖️" },
  navody:   { label: "Návody",       description: "Jak začít s AI od nuly — krok za krokem, bez technického žargonu.",              icon: "🎓" },
  zacatky:  { label: "Začínám s AI", description: "Úplné základy AI pro začátečníky — co to je, jak to funguje a kde začít.",      icon: "🚀" },
  profese:  { label: "AI pro profese", description: "Konkrétní AI nástroje a postupy podle vašeho oboru — marketing, účetnictví, programování a další.", icon: "💼" },
};

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

  // 404 only for truly unknown categories — known static categories show empty state
  const knownCategories = new Set([
    ...STATIC_CATEGORIES,
    ...getAllCategories().map((c) => c.toLowerCase()),
  ]);
  if (!knownCategories.has(category)) {
    notFound();
  }

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
