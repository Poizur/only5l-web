import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleCard from "@/components/article/ArticleCard";
import { getArticlesByCategory, getAllCategories } from "@/lib/articles";
import { site } from "@/lib/site";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  // Only generate EN category slugs (reviews, comparisons, guides)
  return getAllCategories()
    .map((c) => ({ category: c.toLowerCase() }))
    .filter(({ category }) =>
      ["reviews", "comparisons", "guides"].includes(category)
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: cat } = await params;
  return {
    title: cat.charAt(0).toUpperCase() + cat.slice(1),
    description: site.description,
    alternates: { canonical: `${site.url}/category/${cat}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const articles = getArticlesByCategory(category);
  const validCategories = getAllCategories().map((c) => c.toLowerCase());

  if (articles.length === 0 && !validCategories.includes(category)) {
    notFound();
  }

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-surface-600 capitalize">{categoryLabel}</span>
      </nav>

      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">
          Category
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 capitalize">
          {categoryLabel}
        </h1>
        <p className="mt-2 text-surface-500">
          {articles.length} {articles.length === 1 ? "article" : "articles"}
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
          <h2 className="text-xl font-bold text-surface-900 mb-2">No articles yet</h2>
          <p className="text-surface-500">Check back soon — we're testing tools right now.</p>
        </div>
      )}
    </div>
  );
}
