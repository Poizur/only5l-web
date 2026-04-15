"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import type { AiTool } from "@/lib/tools";
import type { Prompt } from "@/lib/prompts";

type ResultType = "article" | "tool" | "prompt";

interface SearchResult {
  type: ResultType;
  id: string;
  title: string;
  description: string;
  href: string;
  badge: string;
  badgeColor: string;
}

interface SearchClientProps {
  articles: Article[];
  tools: AiTool[];
  prompts: Prompt[];
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function score(item: SearchResult, query: string): number {
  const q = normalize(query);
  const title = normalize(item.title);
  const desc = normalize(item.description);
  if (title.startsWith(q)) return 100;
  if (title.includes(q)) return 80;
  if (desc.includes(q)) return 40;
  // word-level
  const words = q.split(/\s+/).filter(Boolean);
  let s = 0;
  for (const w of words) {
    if (title.includes(w)) s += 20;
    if (desc.includes(w)) s += 10;
  }
  return s;
}

function buildResults(
  articles: Article[],
  tools: AiTool[],
  prompts: Prompt[],
  query: string
): SearchResult[] {
  if (!query.trim()) return [];

  const articleResults: SearchResult[] = articles.map((a) => ({
    type: "article" as const,
    id: a.slug,
    title: a.frontmatter.title,
    description: a.excerpt,
    href: `/${a.slug}`,
    badge: a.frontmatter.category,
    badgeColor: "bg-brand-100 text-brand-700",
  }));

  const toolResults: SearchResult[] = tools.map((t) => ({
    type: "tool" as const,
    id: t.id,
    title: t.name,
    description: t.description,
    href: `/track/affiliate/${t.id}`,
    badge: "Nástroj",
    badgeColor: "bg-purple-100 text-purple-700",
  }));

  const promptResults: SearchResult[] = prompts.map((p) => ({
    type: "prompt" as const,
    id: p.id,
    title: p.title,
    description: p.description,
    href: `/prompty#${p.id}`,
    badge: "Prompt",
    badgeColor: "bg-emerald-100 text-emerald-700",
  }));

  const all = [...articleResults, ...toolResults, ...promptResults];
  return all
    .map((r) => ({ ...r, _score: score(r, query) }))
    .filter((r) => r._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 20);
}

const TYPE_ICON: Record<ResultType, string> = {
  article: "📄",
  tool: "🛠️",
  prompt: "✍️",
};

export default function SearchClient({ articles, tools, prompts }: SearchClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(!!initialQ);

  const results = submitted
    ? buildResults(articles, tools, prompts, query)
    : [];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;
      setSubmitted(true);
      router.replace(`/hledat?q=${encodeURIComponent(trimmed)}`, { scroll: false });
    },
    [query, router]
  );

  // Also search on URL param change (direct links)
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    if (q) {
      setQuery(q);
      setSubmitted(true);
    }
  }, [searchParams]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-surface-900 mb-2">Hledat</h1>
        <p className="text-surface-500">
          Prohledáme {articles.length} článků, {tools.length} nástrojů a {prompts.length} promptů.
        </p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="relative mb-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!e.target.value.trim()) setSubmitted(false);
              }}
              placeholder="ChatGPT, Midjourney, prompt pro email…"
              autoFocus
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-surface-200 bg-white text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-base"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shrink-0"
          >
            Hledat
          </button>
        </div>
      </form>

      {/* Results */}
      {submitted && query.trim() && (
        <>
          {results.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-surface-600 font-medium mb-1">
                Žádné výsledky pro „{query}"
              </p>
              <p className="text-surface-400 text-sm">
                Zkus jiný výraz nebo{" "}
                <Link href="/nastroje" className="text-brand-600 hover:underline">
                  procházej nástroje
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-surface-400 mb-4">
                {results.length} výsledků pro „{query}"
              </p>
              <ul className="space-y-3">
                {results.map((r) => (
                  <li key={`${r.type}-${r.id}`}>
                    <Link
                      href={r.href}
                      target={r.type === "tool" ? "_blank" : undefined}
                      rel={r.type === "tool" ? "noopener noreferrer nofollow" : undefined}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl border border-surface-200 hover:border-brand-300 hover:shadow-sm transition-all group"
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{TYPE_ICON[r.type]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded ${r.badgeColor}`}
                          >
                            {r.badge}
                          </span>
                        </div>
                        <p className="font-semibold text-surface-900 group-hover:text-brand-600 transition-colors leading-snug">
                          {r.title}
                        </p>
                        <p className="text-sm text-surface-500 mt-0.5 line-clamp-2">
                          {r.description}
                        </p>
                      </div>
                      <svg
                        className="w-4 h-4 text-surface-300 group-hover:text-brand-400 shrink-0 mt-1 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      {/* Empty state (no query yet) */}
      {!submitted && (
        <div className="rounded-2xl bg-surface-50 border border-surface-200 p-8 text-center">
          <p className="text-surface-400 text-sm">
            Zadej dotaz výše — například název nástroje, téma nebo klíčové slovo.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["ChatGPT", "Midjourney", "prompt pro email", "recenze Cursor", "jak začít"].map(
              (q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setQuery(q);
                    setSubmitted(true);
                    router.replace(`/hledat?q=${encodeURIComponent(q)}`, { scroll: false });
                  }}
                  className="px-3 py-1.5 text-sm bg-white border border-surface-200 rounded-lg text-surface-600 hover:border-brand-300 hover:text-brand-600 transition-colors"
                >
                  {q}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
