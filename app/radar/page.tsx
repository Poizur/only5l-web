import type { Metadata } from "next";
import Link from "next/link";
import { getArticlesByCategory, getAllArticles } from "@/lib/articles";
import { site } from "@/lib/site";
import { formatDistanceToNow } from "date-fns";
import { cs } from "date-fns/locale";

export const metadata: Metadata = {
  title: `AI Radar — živé novinky z AI světa | ${site.name}`,
  description:
    "Sleduj co se dnes děje v AI. Breaking news, nové modely, launche nástrojů — vše na jednom místě. Aktualizováno každé 2 hodiny.",
};

export const revalidate = 7200; // revalidate every 2 hours

function timeAgo(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: cs });
  } catch {
    return dateStr;
  }
}

function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, { label: string; color: string }> = {
    breaking: { label: "🔴 BREAKING", color: "bg-red-100 text-red-700 border-red-200" },
    recenze:  { label: "⭐ Recenze",  color: "bg-amber-100 text-amber-700 border-amber-200" },
    srovnani: { label: "⚖️ Srovnání", color: "bg-blue-100 text-blue-700 border-blue-200" },
    navody:   { label: "🎓 Návod",    color: "bg-green-100 text-green-700 border-green-200" },
  };
  const meta = map[category] ?? { label: "📰 Novinka", color: "bg-surface-100 text-surface-600 border-surface-200" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${meta.color}`}>
      {meta.label}
    </span>
  );
}

export default function RadarPage() {
  // Breaking news first, then all recent articles sorted by date
  const breakingArticles = getArticlesByCategory("breaking");
  const recentArticles = getAllArticles()
    .filter((a) => a.frontmatter.category !== "breaking")
    .slice(0, 10);

  const allItems = [
    ...breakingArticles.slice(0, 10),
    ...recentArticles,
  ]
    .sort((a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
    )
    .slice(0, 20);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">📡</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Živé novinky
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900">
              AI Radar
            </h1>
          </div>
        </div>
        <p className="text-surface-500 text-base">
          Nejdůležitější dění ve světě AI — nové modely, launche, regulace.
          Aktualizováno každé 2 hodiny.
        </p>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2 mb-8 p-3 rounded-xl bg-surface-50 border border-surface-200">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <span className="text-sm text-surface-500">
          Živý feed · agent monitoruje Twitter/X a AI newsroomy každé 2 hodiny
        </span>
      </div>

      {allItems.length === 0 ? (
        <div className="text-center py-20 text-surface-400">
          <p className="text-4xl mb-4">📡</p>
          <p className="text-lg font-medium">Žádné novinky zatím</p>
          <p className="text-sm mt-2">Agent začne sledovat novinky v pondělí ráno.</p>
        </div>
      ) : (
        <div className="space-y-0">
          {allItems.map((article, i) => (
            <article
              key={article.slug}
              className="group relative flex gap-4 py-5 border-b border-surface-100 last:border-0 hover:bg-surface-50 -mx-3 px-3 rounded-xl transition-colors"
            >
              {/* Timeline dot */}
              <div className="flex-shrink-0 flex flex-col items-center pt-1">
                <div
                  className={`w-2.5 h-2.5 rounded-full mt-1 ${
                    article.frontmatter.category === "breaking"
                      ? "bg-red-500"
                      : "bg-surface-300"
                  }`}
                />
                {i < allItems.length - 1 && (
                  <div className="w-px flex-1 bg-surface-100 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <CategoryBadge category={article.frontmatter.category} />
                  <span className="text-xs text-surface-400">
                    {timeAgo(article.frontmatter.publishedAt)}
                  </span>
                </div>
                <Link href={`/${article.slug}`}>
                  <h2 className="font-semibold text-surface-900 group-hover:text-brand-700 transition-colors leading-snug mb-1">
                    {article.frontmatter.title}
                  </h2>
                </Link>
                {article.frontmatter.description && (
                  <p className="text-sm text-surface-500 line-clamp-2 leading-relaxed">
                    {article.frontmatter.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="mt-12 p-6 rounded-2xl bg-brand-50 border border-brand-100 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-2">
          Nechceš nic propásnout?
        </p>
        <p className="text-surface-700 mb-4">
          Každý pátek pošleme 5 nejdůležitějších AI novinek týdne přímo do tvého inboxu.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors"
        >
          Přihlásit se k newsletteru →
        </Link>
      </div>
    </div>
  );
}
