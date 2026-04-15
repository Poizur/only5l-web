"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  PROMPTS,
  PROMPT_CATEGORY_LABELS,
  type Prompt,
  type PromptCategory,
} from "@/lib/prompts";

function DifficultyBadge({ difficulty }: { difficulty: Prompt["difficulty"] }) {
  const map = {
    "začátečník": "bg-green-100 text-green-700 border-green-200",
    "pokročilý":  "bg-amber-100 text-amber-700 border-amber-200",
    "expert":     "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${map[difficulty]}`}>
      {difficulty}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        copied
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-brand-600 text-white hover:bg-brand-700"
      }`}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
          </svg>
          Zkopírováno!
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          Kopírovat prompt
        </>
      )}
    </button>
  );
}

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [expanded, setExpanded] = useState(false);
  const cat = PROMPT_CATEGORY_LABELS[prompt.category];

  return (
    <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-brand-200 transition-all">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{cat.icon}</span>
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">{cat.label}</span>
          </div>
          <DifficultyBadge difficulty={prompt.difficulty} />
        </div>
        <h3 className="text-lg font-bold text-surface-900 mb-1">{prompt.title}</h3>
        <p className="text-sm text-surface-500 leading-relaxed">{prompt.description}</p>

        {/* Best for */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {prompt.bestFor.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center px-2 py-0.5 rounded bg-surface-100 text-surface-600 text-xs font-medium"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable prompt */}
      <div className="border-t border-surface-100">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-surface-600 hover:bg-surface-50 transition-colors"
        >
          <span>📋 {expanded ? "Skrýt prompt" : "Zobrazit prompt"}</span>
          <svg
            className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        {expanded && (
          <div className="px-5 pb-5">
            {/* Prompt text */}
            <div className="relative bg-surface-50 rounded-xl border border-surface-200 p-4 mt-1">
              <pre className="text-xs text-surface-700 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
                {prompt.prompt}
              </pre>
            </div>

            {/* Tips */}
            {prompt.tips && prompt.tips.length > 0 && (
              <div className="mt-3 space-y-1">
                {prompt.tips.map((tip, i) => (
                  <p key={i} className="flex items-start gap-2 text-xs text-surface-500">
                    <span className="text-brand-500 mt-0.5">💡</span>
                    {tip}
                  </p>
                ))}
              </div>
            )}

            {/* Copy button */}
            <div className="mt-3 flex justify-end">
              <CopyButton text={prompt.prompt} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PromptyPage() {
  const [activeCategory, setActiveCategory] = useState<PromptCategory | "vse">("vse");
  const [difficulty, setDifficulty] = useState<Prompt["difficulty"] | "vse">("vse");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return PROMPTS.filter((p) => {
      if (activeCategory !== "vse" && p.category !== activeCategory) return false;
      if (difficulty !== "vse" && p.difficulty !== difficulty) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q) &&
          !p.bestFor.some((t) => t.toLowerCase().includes(q))
        ) return false;
      }
      return true;
    });
  }, [activeCategory, difficulty, search]);

  const categories: Array<{ value: PromptCategory | "vse"; label: string; icon: string }> = [
    { value: "vse",          label: "Vše",           icon: "🔮" },
    ...Object.entries(PROMPT_CATEGORY_LABELS).map(([k, v]) => ({
      value: k as PromptCategory,
      label: v.label,
      icon:  v.icon,
    })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Domů</Link>
        <span>/</span>
        <span className="text-surface-600">Prompt knihovna</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">Knihovna</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900">
          ✍️ Prompt knihovna
        </h1>
        <p className="mt-3 text-surface-500 max-w-2xl text-lg leading-relaxed">
          Sbírka nejlepších českých AI promptů — otestovaných, strukturovaných a připravených ke zkopírování.
          Klikni na prompt a zkopíruj ho jedním tlačítkem.
        </p>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap gap-3">
          {[
            { emoji: "📝", label: "Promptů",      value: PROMPTS.length },
            { emoji: "🗂️", label: "Kategorií",    value: Object.keys(PROMPT_CATEGORY_LABELS).length },
            { emoji: "🆓", label: "Zdarma",        value: "100%" },
          ].map(({ emoji, label, value }) => (
            <div key={label} className="flex items-center gap-2 bg-surface-50 border border-surface-200 rounded-xl px-4 py-2">
              <span>{emoji}</span>
              <span className="font-bold text-surface-900">{value}</span>
              <span className="text-xs text-surface-400">{label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border border-surface-200 rounded-2xl p-5 mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Hledat prompt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setActiveCategory(c.value)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === c.value
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white text-surface-600 border-surface-200 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-surface-500">Obtížnost:</span>
          {(["vse", "začátečník", "pokročilý", "expert"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                difficulty === d
                  ? "bg-surface-800 text-white border-surface-800"
                  : "bg-white text-surface-500 border-surface-200 hover:border-surface-400"
              }`}
            >
              {d === "vse" ? "Vše" : d}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-surface-400 mb-4">
        {filtered.length} {filtered.length === 1 ? "prompt" : filtered.length < 5 ? "prompty" : "promptů"}
      </p>

      {/* Prompt cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface-50 rounded-2xl border border-surface-200">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-surface-600 font-medium">Žádný prompt neodpovídá filtrům</p>
          <button
            onClick={() => { setActiveCategory("vse"); setDifficulty("vse"); setSearch(""); }}
            className="mt-3 text-brand-600 hover:text-brand-700 text-sm font-medium"
          >
            Resetovat filtry
          </button>
        </div>
      )}

      {/* CTA - community */}
      <div className="mt-12 rounded-2xl bg-brand-50 border border-brand-100 px-6 py-6 text-center">
        <p className="text-2xl mb-2">🙌</p>
        <h2 className="text-lg font-bold text-surface-900 mb-1">Máš skvělý prompt?</h2>
        <p className="text-surface-500 text-sm mb-4">
          Sdílej ho s komunitou — napište nám a přidáme ho do knihovny.
        </p>
        <a
          href="mailto:ahoj@aikompass.cz?subject=Prompt pro knihovnu"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          ✉️ Poslat prompt
        </a>
      </div>
    </div>
  );
}
