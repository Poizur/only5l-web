'use client'

import { useState, useEffect } from 'react'

type Plan = { tool: string; plan: string; priceUsd: number; features: string[]; url: string; badge?: string }

const PLANS: Plan[] = [
  { tool: 'ChatGPT', plan: 'Free',     priceUsd: 0,    features: ['GPT-4o mini', 'Omezené GPT-4o', 'Generování obrázků'],    url: 'https://chat.openai.com/' },
  { tool: 'ChatGPT', plan: 'Plus',     priceUsd: 20,   features: ['GPT-4o bez limitu', 'DALL-E 3', 'Analýza dat a kód'],      url: 'https://chat.openai.com/', badge: 'Nejoblíbenější' },
  { tool: 'ChatGPT', plan: 'Pro',      priceUsd: 200,  features: ['o1 Pro bez limitu', 'Prioritní přístup', 'Pokročilý hlas'], url: 'https://chat.openai.com/' },
  { tool: 'Claude',  plan: 'Free',     priceUsd: 0,    features: ['Claude 3.5 Sonnet', 'Omezené zprávy', 'Projekty'],          url: 'https://claude.ai/' },
  { tool: 'Claude',  plan: 'Pro',      priceUsd: 20,   features: ['Sonnet bez limitu', 'Prioritní přístup', 'Delší kontext'],  url: 'https://claude.ai/', badge: 'Nejlepší čeština' },
  { tool: 'Claude',  plan: 'Max',      priceUsd: 100,  features: ['5× více zpráv', 'Claude 3 Opus', 'Rozšířené projekty'],    url: 'https://claude.ai/' },
  { tool: 'Gemini',  plan: 'Free',     priceUsd: 0,    features: ['Gemini 1.5 Flash', 'Google integrace', 'Obrázky'],         url: 'https://gemini.google.com/' },
  { tool: 'Gemini',  plan: 'Advanced', priceUsd: 21.99,features: ['Gemini 1.5 Pro', 'Google One 2TB', 'Deep Research'],       url: 'https://gemini.google.com/' },
  { tool: 'Perplexity', plan: 'Free',  priceUsd: 0,    features: ['5 Pro hledání/den', 'Citace zdrojů', 'Rychlé odpovědi'],  url: 'https://www.perplexity.ai/' },
  { tool: 'Perplexity', plan: 'Pro',   priceUsd: 20,   features: ['Neomezené hledání', 'GPT-4 & Claude', 'Soubory & obrázky'], url: 'https://www.perplexity.ai/', badge: 'Nejlepší výzkum' },
  { tool: 'Copilot', plan: 'Free',     priceUsd: 0,    features: ['GPT-4o základní', 'Bing integrace', 'Obrázky'],            url: 'https://copilot.microsoft.com/' },
  { tool: 'Copilot', plan: 'Pro',      priceUsd: 22,   features: ['Prioritní přístup', 'M365 integrace', 'Designer kredity'], url: 'https://copilot.microsoft.com/' },
]

const CHIP: Record<string, string> = {
  ChatGPT:    'bg-emerald-100 text-emerald-700',
  Claude:     'bg-orange-100 text-orange-700',
  Gemini:     'bg-blue-100 text-blue-700',
  Perplexity: 'bg-teal-100 text-teal-700',
  Copilot:    'bg-sky-100 text-sky-700',
}

export default function PriceComparison() {
  const [rate, setRate] = useState<number>(23.5)
  const [freeOnly, setFreeOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'price' | 'tool'>('tool')

  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?from=USD&to=CZK')
      .then(r => r.json())
      .then(d => { if (d.rates?.CZK) setRate(d.rates.CZK) })
      .catch(() => {})
  }, [])

  const toCZK = (usd: number) => Math.round(usd * rate)

  const plans = [...PLANS]
    .filter(p => !freeOnly || p.priceUsd === 0)
    .sort((a, b) => sortBy === 'price' ? a.priceUsd - b.priceUsd : a.tool.localeCompare(b.tool))

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <span className="text-sm text-surface-500 bg-surface-50 px-3 py-1.5 rounded-lg border border-surface-200">
          💱 1 USD = <strong>{rate.toFixed(2)} Kč</strong> <span className="text-xs">(frankfurter.app)</span>
        </span>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setSortBy(s => s === 'price' ? 'tool' : 'price')}
            className="text-sm px-3 py-1.5 rounded-lg border border-surface-200 text-surface-600 hover:border-brand-300 transition-colors">
            {sortBy === 'price' ? '↑ Cena' : 'A–Z Nástroj'}
          </button>
          <button onClick={() => setFreeOnly(f => !f)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${freeOnly ? 'bg-brand-600 text-white border-brand-600' : 'border-surface-200 text-surface-600 hover:border-brand-300'}`}>
            Jen zdarma
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-surface-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-surface-50 border-b border-surface-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-surface-600">Nástroj & Plán</th>
              <th className="text-right px-4 py-3 font-semibold text-surface-600">USD/měsíc</th>
              <th className="text-right px-4 py-3 font-semibold text-surface-600 bg-brand-50">Kč/měsíc</th>
              <th className="text-left px-4 py-3 font-semibold text-surface-600 hidden md:table-cell">Co dostanete</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p, i) => (
              <tr key={`${p.tool}-${p.plan}`}
                className={`border-b border-surface-100 hover:bg-brand-50/40 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-surface-50/60'}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CHIP[p.tool] ?? 'bg-surface-100 text-surface-600'}`}>{p.tool}</span>
                    <span className="font-semibold text-surface-800">{p.plan}</span>
                    {p.badge && <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">{p.badge}</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-surface-600">
                  {p.priceUsd === 0 ? <span className="text-emerald-600 font-bold">—</span> : `$${p.priceUsd}`}
                </td>
                <td className="px-4 py-3 text-right font-bold text-surface-900 bg-brand-50/40">
                  {p.priceUsd === 0
                    ? <span className="text-emerald-600 font-bold">Zdarma</span>
                    : <span>{toCZK(p.priceUsd)} <span className="text-surface-400 font-normal">Kč</span></span>}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <ul className="text-xs text-surface-500 space-y-0.5">
                    {p.features.map(f => <li key={f}>• {f}</li>)}
                  </ul>
                </td>
                <td className="px-4 py-3 text-right">
                  <a href={p.url} target="_blank" rel="noopener noreferrer sponsored"
                    className="text-xs text-brand-600 hover:text-brand-700 font-semibold whitespace-nowrap">
                    Vyzkoušet →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-surface-400 mt-3">
        * Ceny přepočteny z USD živým kurzem. Konečná cena závisí na poskytovateli platby a případném DPH.
      </p>
    </div>
  )
}
