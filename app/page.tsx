import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import ArticleCard from "@/components/article/ArticleCard";
import { getAllArticles, getFeaturedArticles, getArticlesByCategory } from "@/lib/articles";
import { site } from "@/lib/site";
import Link from "next/link";
import PersonalizedSection from "@/components/ui/PersonalizedSection";
import InteractiveHooks from "@/components/ui/InteractiveHooks";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

const CATEGORIES = [
  {
    slug: "recenze",
    label: "Recenze",
    icon: "⭐",
    description: "Poctivé recenze AI nástrojů — co funguje, co ne, kolik to stojí",
    href: "/kategorie/recenze",
  },
  {
    slug: "srovnani",
    label: "Srovnání",
    icon: "⚖️",
    description: "Porovnáváme nástroje mezi sebou, abys nemusel/a rozhodovat naslepo",
    href: "/kategorie/srovnani",
  },
  {
    slug: "navody",
    label: "Návody & Začátečníci",
    icon: "🎓",
    description: "Jak začít s AI od nuly — krok za krokem, bez technického žargonu",
    href: "/kategorie/navody",
  },
];

export default function HomePage() {
  const allArticles = getAllArticles();
  const featured = getFeaturedArticles(3);
  const recent = allArticles.slice(0, 6);
  const guides = getArticlesByCategory("navody").slice(0, 3);
  const comparisons = getArticlesByCategory("srovnani").slice(0, 3);

  return (
    <>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Interactive hooks — engagement first (Fáze 17, 19.4.2026) */}
        <InteractiveHooks />

        {/* Rozcestník */}
        <section>
          <SectionHeader
            label="Kde začít?"
            title="Vyber si co tě zajímá"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => {
              const count = getArticlesByCategory(cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="group bg-surface-0 rounded-2xl border border-surface-200 p-6 hover:border-brand-300 hover:shadow-md transition-all"
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-bold text-surface-900 text-lg group-hover:text-brand-600 transition-colors mb-1">
                    {cat.label}
                  </h3>
                  <p className="text-surface-500 text-sm leading-relaxed mb-4">{cat.description}</p>
                  <span className="text-xs font-semibold text-brand-500">
                    {count} {count === 1 ? "článek" : count < 5 ? "články" : "článků"} →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured articles */}
        {featured.length > 0 && (
          <section>
            <SectionHeader
              label="Doporučujeme"
              title="Nejčtenější tento týden"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Beginners / Guides */}
        {guides.length > 0 && (
          <section className="below-fold">
            <SectionHeader
              label="Začínám s AI"
              title="Průvodce pro začátečníky"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/kategorie/navody"
                className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
              >
                Zobrazit všechny návody →
              </Link>
            </div>
          </section>
        )}

        {/* Comparisons */}
        {comparisons.length > 0 && (
          <section className="below-fold">
            <SectionHeader
              label="Srovnání"
              title="Nevíš co vybrat? Porovnali jsme to za tebe"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisons.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/kategorie/srovnani"
                className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
              >
                Zobrazit všechna srovnání →
              </Link>
            </div>
          </section>
        )}

        {/* Personalized recommendations — client-side, cookie-based */}
        <PersonalizedSection articles={allArticles} />

        {/* Recent articles */}
        {recent.length > 0 && (
          <section className="below-fold">
            <SectionHeader
              label="Nejnovější"
              title="Čerstvé recenze a návody"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
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
