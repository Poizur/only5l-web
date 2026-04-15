import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllArticles } from "@/lib/articles";
import { AI_TOOLS } from "@/lib/tools";
import { PROMPTS } from "@/lib/prompts";
import SearchClient from "@/components/search/SearchClient";

export const metadata: Metadata = {
  title: "Hledat",
  description:
    "Prohledej články, AI nástroje a prompty na AI Kompass — najdi co hledáš rychle.",
  robots: { index: false, follow: true },
};

function SearchFallback() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-10 bg-surface-100 rounded-xl animate-pulse mb-8 w-48" />
      <div className="h-14 bg-surface-100 rounded-xl animate-pulse" />
    </div>
  );
}

export default function HledatPage() {
  const articles = getAllArticles();
  // Strip content from articles to keep payload small
  const lightArticles = articles.map(({ slug, frontmatter, excerpt }) => ({
    slug,
    frontmatter,
    excerpt,
    readingTimeText: "",
  }));

  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchClient
        articles={lightArticles}
        tools={AI_TOOLS}
        prompts={PROMPTS}
      />
    </Suspense>
  );
}
