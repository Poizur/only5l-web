import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import ArticleCard from "@/components/article/ArticleCard";
import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import { site, nav, ui } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

export default function HomePage() {
  const featured = getFeaturedArticles(1);
  const recent = getAllArticles().slice(0, 9);

  return (
    <>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Featured article */}
        {featured.length > 0 && (
          <section>
            <SectionHeader
              label={site.locale === "cs" ? "Doporučujeme" : "Featured"}
              title={site.locale === "cs" ? "Nejlepší recenze tohoto týdne" : "Top pick this week"}
            />
            <ArticleCard article={featured[0]} featured />
          </section>
        )}

        {/* Category quick-links */}
        <section>
          <SectionHeader
            label={site.locale === "cs" ? "Kategorie" : "Categories"}
            title={site.locale === "cs" ? "Co tě zajímá?" : "What are you looking for?"}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nav.links.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group card-hover bg-surface-0 rounded-2xl border border-surface-200 p-6 flex items-center justify-between"
              >
                <span className="font-semibold text-surface-900 group-hover:text-brand-600 transition-colors">
                  {link.label}
                </span>
                <span className="text-brand-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent articles */}
        {recent.length > 0 && (
          <section>
            <SectionHeader
              label={site.locale === "cs" ? "Nejnovější" : "Latest"}
              title={site.locale === "cs" ? "Čerstvé recenze a návody" : "Fresh reviews & guides"}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {recent.length === 0 && (
          <section className="text-center py-20">
            <p className="text-6xl mb-4">🚀</p>
            <h2 className="text-2xl font-bold text-surface-900 mb-2">
              {site.locale === "cs" ? "Obsah se připravuje" : "Content coming soon"}
            </h2>
            <p className="text-surface-500">
              {site.locale === "cs"
                ? "První recenze vyjdou v nejbližší době."
                : "First reviews are coming very soon."}
            </p>
          </section>
        )}

      </div>
    </>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">{label}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-surface-900">{title}</h2>
    </div>
  );
}
