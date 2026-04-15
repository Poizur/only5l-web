"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  AI_TOOLS,
  CATEGORY_LABELS,
  CZECH_LABELS,
  filterTools,
  type AiTool,
  type ToolCategory,
  type CzechSupport,
} from "@/lib/tools";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < full ? "fill-current" : i === full && half ? "fill-current opacity-50" : "fill-surface-200"}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
      <span className="ml-1 text-surface-600 font-medium">{rating.toFixed(1)}</span>
    </span>
  );
}

function CzechBadge({ czech }: { czech: CzechSupport }) {
  const colors: Record<CzechSupport, string> = {
    ano:      "bg-green-100 text-green-700 border-green-200",
    castecne: "bg-amber-100 text-amber-700 border-amber-200",
    ne:       "bg-surface-100 text-surface-500 border-surface-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[czech]}`}>
      🇨🇿 {CZECH_LABELS[czech]}
    </span>
  );
}

function GdprBadge({ gdpr }: { gdpr: AiTool["gdpr"] }) {
  const map = {
    ok:        { label: "GDPR ✓",    color: "bg-green-100 text-green-700 border-green-200" },
    castecne:  { label: "GDPR ~",    color: "bg-amber-100 text-amber-700 border-amber-200" },
    riziko:    { label: "GDPR ⚠",    color: "bg-red-100 text-red-700 border-red-200" },
  };
  const { label, color } = map[gdpr];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${color}`}>
      {label}
    </span>
  );
}

function ToolCard({ tool }: { tool: AiTool }) {
  const cat = CATEGORY_LABELS[tool.category];
  return (
    <div className="bg-white border border-surface-200 rounded-2xl p-5 hover:shadow-md hover:border-brand-200 transition-all flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{cat.icon}</span>
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">{cat.label}</span>
          </div>
          <h3 className="text-lg font-bold text-surface-900 leading-tight">{tool.name}</h3>
          <p className="text-xs text-surface-400 mt-0.5">{tool.vendor}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-sm font-bold text-surface-900">
            {tool.priceFrom === null
              ? <span className="text-green-600">Zdarma</span>
              : `od $${tool.priceFrom}/měs`}
          </div>
          {tool.freeTier && (
            <div className="text-xs text-green-600 font-medium">Free plán</div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-surface-600 leading-relaxed">{tool.description}</p>

      {/* Features */}
      <ul className="space-y-1">
        {tool.mainFeatures.slice(0, 3).map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-surface-600">
            <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        <StarRating rating={tool.rating} />
        <CzechBadge czech={tool.czech} />
        <GdprBadge gdpr={tool.gdpr} />
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 pt-1 border-t border-surface-100 mt-auto">
        <a
          href={`/track/affiliate/${tool.id}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-1 text-center py-2 px-4 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
        >
          Vyzkoušet →
        </a>
        <Link
          href={`/srovnani-nastroju?add=${tool.id}`}
          className="py-2 px-3 rounded-lg border border-surface-200 text-sm text-surface-600 hover:bg-surface-50 hover:border-brand-300 transition-colors"
          title="Přidat do srovnání"
        >
          ⚖️
        </Link>
      </div>
    </div>
  );
}

export default function ToolsDatabase() {
  const [category, setCategory] = useState<ToolCategory | "vse">("vse");
  const [freeTierOnly, setFreeTierOnly] = useState(false);
  const [czech, setCzech] = useState<CzechSupport | "vse">("vse");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let tools = filterTools(AI_TOOLS, { category, freeTierOnly, czech, maxPrice });
    if (search.trim()) {
      const q = search.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.mainFeatures.some((f) => f.toLowerCase().includes(q))
      );
    }
    return tools.sort((a, b) => b.rating - a.rating);
  }, [category, freeTierOnly, czech, maxPrice, search]);

  const categories: Array<{ value: ToolCategory | "vse"; label: string; icon: string }> = [
    { value: "vse",         label: "Vše",          icon: "🔮" },
    { value: "psani",       label: "Psaní",         icon: "✍️" },
    { value: "obrazky",     label: "Obrázky",       icon: "🖼️" },
    { value: "video",       label: "Video",          icon: "🎬" },
    { value: "kod",         label: "Kód",            icon: "💻" },
    { value: "seo",         label: "SEO",            icon: "🔍" },
    { value: "produktivita",label: "Produktivita",   icon: "⚡" },
  ];

  return (
    <div>
      {/* Filters */}
      <div className="bg-white border border-surface-200 rounded-2xl p-5 mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Hledat nástroj..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                category === c.value
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white text-surface-600 border-surface-200 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Secondary filters */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={freeTierOnly}
              onChange={(e) => setFreeTierOnly(e.target.checked)}
              className="w-4 h-4 accent-brand-600 rounded"
            />
            <span className="text-surface-700">Jen free plán</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-surface-500">Čeština:</span>
            <select
              value={czech}
              onChange={(e) => setCzech(e.target.value as CzechSupport | "vse")}
              className="border border-surface-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="vse">Vše</option>
              <option value="ano">Ano</option>
              <option value="castecne">Částečně</option>
              <option value="ne">Ne</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-surface-500">Max. cena:</span>
            <select
              value={maxPrice ?? ""}
              onChange={(e) => setMaxPrice(e.target.value === "" ? null : Number(e.target.value))}
              className="border border-surface-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="">Bez omezení</option>
              <option value="0">Jen zdarma</option>
              <option value="10">do $10</option>
              <option value="20">do $20</option>
              <option value="50">do $50</option>
            </select>
          </div>

          {(category !== "vse" || freeTierOnly || czech !== "vse" || maxPrice !== null || search) && (
            <button
              onClick={() => { setCategory("vse"); setFreeTierOnly(false); setCzech("vse"); setMaxPrice(null); setSearch(""); }}
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              ✕ Resetovat filtry
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-surface-400 mb-4">
        {filtered.length} {filtered.length === 1 ? "nástroj" : filtered.length < 5 ? "nástroje" : "nástrojů"}
        {filtered.length !== AI_TOOLS.length && ` z ${AI_TOOLS.length}`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-surface-600 font-medium">Žádný nástroj neodpovídá filtrům</p>
          <button
            onClick={() => { setCategory("vse"); setFreeTierOnly(false); setCzech("vse"); setMaxPrice(null); setSearch(""); }}
            className="mt-3 text-brand-600 hover:text-brand-700 text-sm font-medium"
          >
            Resetovat filtry
          </button>
        </div>
      )}
    </div>
  );
}
