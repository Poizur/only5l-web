"use client";

/**
 * PersonalizedSection — zobrazuje doporučené články podle cookie ai_cats.
 * Čte kategorii zájmu uživatele, filtruje a zobrazuje relevantní články.
 * Bez přihlášení — čistě cookie-based, GDPR-friendly (technická cookie).
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Article } from "@/lib/articles";

const COOKIE_NAME = "ai_cats";

function getCats(): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return [];
  return decodeURIComponent(match[1]).split(",").filter(Boolean);
}

interface Props {
  articles: Article[];
}

export default function PersonalizedSection({ articles }: Props) {
  const [recommendations, setRecommendations] = useState<Article[]>([]);
  const [topCat, setTopCat] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cats = getCats();
    if (!cats.length) return;

    const primary = cats[0];
    setTopCat(primary);

    // Score articles: +3 for primary category, +1 for secondary cats
    const scored = articles.map((a) => {
      const cat = a.frontmatter.category.toLowerCase();
      let score = 0;
      cats.forEach((c, idx) => {
        if (cat === c.toLowerCase()) score += Math.max(3 - idx, 1);
      });
      return { article: a, score };
    });

    const top = scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((s) => s.article);

    setRecommendations(top);
  }, [articles]);

  // Don't render on server or if no personalization data yet
  if (!mounted || recommendations.length === 0) return null;

  const CATEGORY_LABEL: Record<string, string> = {
    recenze: "recenzí",
    srovnani: "srovnání",
    navody: "návodů",
    zacatky: "začátků",
  };

  const label = topCat ? CATEGORY_LABEL[topCat] ?? topCat : "obsahu";

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1">
          Doporučeno pro tebe
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-surface-900">
          Víme, že tě zajímají {label}
        </h2>
        <p className="text-surface-500 text-sm mt-1">
          Na základě toho, co jsi četl/a — bez přihlášení.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {recommendations.map((article) => (
          <Link
            key={article.slug}
            href={`/${article.slug}`}
            className="group block bg-white border border-surface-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-sm transition-all"
          >
            <span className="text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded mb-2 inline-block">
              {article.frontmatter.category}
            </span>
            <p className="font-semibold text-surface-900 group-hover:text-brand-600 transition-colors leading-snug mt-2 line-clamp-2">
              {article.frontmatter.title}
            </p>
            <p className="text-xs text-surface-400 mt-2 line-clamp-2">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
      <p className="mt-3 text-xs text-surface-300 text-right">
        Doporučujeme na základě tvé aktivity v prohlížeči · Žádná registrace
      </p>
    </section>
  );
}
