"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AI_TOOLS,
  CATEGORY_LABELS,
  CZECH_LABELS,
  type AiTool,
} from "@/lib/tools";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-surface-200 fill-current"}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-bold text-surface-800">{rating.toFixed(1)}</span>
    </div>
  );
}

function BoolBadge({ value }: { value: boolean }) {
  return value
    ? <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>Ano</span>
    : <span className="inline-flex items-center gap-1 text-surface-400 text-sm"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>Ne</span>;
}

function GdprLabel({ gdpr }: { gdpr: AiTool["gdpr"] }) {
  const map = {
    ok:       { label: "Splňuje GDPR",   color: "text-green-600" },
    castecne: { label: "Částečně",        color: "text-amber-600" },
    riziko:   { label: "⚠️ Riziko",       color: "text-red-600"   },
  };
  const { label, color } = map[gdpr];
  return <span className={`text-sm font-medium ${color}`}>{label}</span>;
}

const COMPARISON_ROWS: Array<{
  key: string;
  label: string;
  render: (t: AiTool) => React.ReactNode;
}> = [
  { key: "category",  label: "Kategorie",    render: (t) => `${CATEGORY_LABELS[t.category].icon} ${CATEGORY_LABELS[t.category].label}` },
  { key: "rating",    label: "Hodnocení",    render: (t) => <StarRating rating={t.rating} /> },
  { key: "price",     label: "Cena / měsíc", render: (t) => t.priceFrom === null ? <span className="text-green-600 font-semibold">Zdarma</span> : `od $${t.priceFrom}` },
  { key: "freeTier",  label: "Free plán",    render: (t) => <BoolBadge value={t.freeTier} /> },
  { key: "czech",     label: "Čeština",      render: (t) => {
    const colors = { ano: "text-green-600", castecne: "text-amber-600", ne: "text-surface-400" };
    return <span className={`font-medium text-sm ${colors[t.czech]}`}>🇨🇿 {CZECH_LABELS[t.czech]}</span>;
  }},
  { key: "gdpr",      label: "GDPR",         render: (t) => <GdprLabel gdpr={t.gdpr} /> },
  { key: "features",  label: "Hlavní funkce", render: (t) => (
    <ul className="space-y-1 text-left">
      {t.mainFeatures.map((f) => (
        <li key={f} className="flex items-start gap-1.5 text-xs text-surface-600">
          <svg className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
          </svg>
          {f}
        </li>
      ))}
    </ul>
  )},
  { key: "vendor",    label: "Výrobce",      render: (t) => <span className="text-xs text-surface-500">{t.vendor}</span> },
];

export default function SrovnaniClient() {
  const searchParams = useSearchParams();
  const addId = searchParams?.get("add");

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (addId && AI_TOOLS.some((t) => t.id === addId)) {
      setSelected((prev) => {
        if (prev.includes(addId)) return prev;
        if (prev.length >= 3) return [...prev.slice(1), addId];
        return [...prev, addId];
      });
    }
  }, [addId]);

  const selectedTools = useMemo(
    () => selected.map((id) => AI_TOOLS.find((t) => t.id === id)).filter(Boolean) as AiTool[],
    [selected]
  );

  const [pickerQuery, setPickerQuery] = useState("");
  const pickerTools = useMemo(() => {
    const q = pickerQuery.toLowerCase();
    return AI_TOOLS.filter(
      (t) =>
        !selected.includes(t.id) &&
        (t.name.toLowerCase().includes(q) || CATEGORY_LABELS[t.category].label.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [pickerQuery, selected]);

  return (
    <div>
      {/* Tool picker */}
      <div className="bg-white border border-surface-200 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-surface-700">
            Vybraných nástrojů: <span className="text-brand-600">{selected.length} / 3</span>
          </p>
          {selected.length > 0 && (
            <button onClick={() => setSelected([])} className="text-xs text-surface-400 hover:text-surface-600">
              ✕ Vymazat vše
            </button>
          )}
        </div>

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTools.map((t) => (
              <span
                key={t.id}
                className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium px-3 py-1 rounded-full"
              >
                {t.name}
                <button onClick={() => setSelected((p) => p.filter((id) => id !== t.id))} className="hover:text-brand-900">×</button>
              </span>
            ))}
          </div>
        )}

        {selected.length < 3 && (
          <>
            <input
              type="text"
              placeholder="Hledat nástroj k přidání..."
              value={pickerQuery}
              onChange={(e) => setPickerQuery(e.target.value)}
              className="w-full px-3 py-2 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 mb-3"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {pickerTools.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelected((p) => [...p, t.id])}
                  className="flex items-center gap-2 px-3 py-2 border border-surface-200 rounded-xl text-sm text-surface-700 hover:border-brand-300 hover:bg-brand-50 transition-colors text-left"
                >
                  <span>{CATEGORY_LABELS[t.category].icon}</span>
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Comparison table */}
      {selectedTools.length >= 2 ? (
        <div className="overflow-x-auto rounded-2xl border border-surface-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-200">
                <th className="text-left px-5 py-4 text-xs font-semibold text-surface-400 uppercase tracking-wide w-36 sm:w-44">
                  Kritérium
                </th>
                {selectedTools.map((t) => (
                  <th key={t.id} className="px-5 py-4 text-center">
                    <div className="font-bold text-surface-900 text-base">{t.name}</div>
                    <div className="text-xs text-surface-400 font-normal">{t.vendor}</div>
                    <div className="mt-2">
                      <a
                        href={t.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-block px-3 py-1 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors"
                      >
                        Vyzkoušet →
                      </a>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={row.key}
                  className={`border-b border-surface-100 ${i % 2 === 0 ? "bg-white" : "bg-surface-50/50"}`}
                >
                  <td className="px-5 py-4 font-medium text-surface-500 text-xs uppercase tracking-wide align-top">
                    {row.label}
                  </td>
                  {selectedTools.map((t) => (
                    <td key={t.id} className="px-5 py-4 text-center align-top">
                      {row.render(t)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-surface-100 bg-white">
                <td className="px-5 py-4 font-medium text-surface-500 text-xs uppercase tracking-wide align-top">
                  Popis
                </td>
                {selectedTools.map((t) => (
                  <td key={t.id} className="px-5 py-4 text-xs text-surface-600 text-center align-top max-w-xs">
                    {t.description}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-50 rounded-2xl border border-surface-200">
          <p className="text-5xl mb-4">⚖️</p>
          <h2 className="text-xl font-bold text-surface-900 mb-2">Vyber alespoň 2 nástroje</h2>
          <p className="text-surface-500 mb-6">Použij vyhledávač výše nebo přijdi z databáze nástrojů.</p>
          <Link
            href="/nastroje"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Procházet nástroje →
          </Link>
        </div>
      )}

      {/* Quick-compare presets */}
      {selectedTools.length < 2 && (
        <div className="mt-8">
          <p className="text-sm font-semibold text-surface-500 mb-3">Populární srovnání:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "ChatGPT vs Claude",           ids: ["chatgpt", "claude"] },
              { label: "Midjourney vs DALL-E 3",      ids: ["midjourney", "dalle3"] },
              { label: "GitHub Copilot vs Cursor",    ids: ["githubcopilot", "cursor"] },
              { label: "Make vs Zapier",              ids: ["make", "zapier"] },
              { label: "ChatGPT vs Claude vs Gemini", ids: ["chatgpt", "claude", "gemini"] },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setSelected(preset.ids)}
                className="px-4 py-2 border border-surface-200 rounded-xl text-sm text-surface-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
