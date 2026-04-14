'use client'

import { useState, useEffect } from 'react'
import { AFFILIATE_LINKS } from '@/lib/affiliate-links'

const FIELDS = [
  { id: 'marketing',    label: 'Marketing & Social media',      rate: 0.40, tool: 'Jasper',          toolUrl: AFFILIATE_LINKS.jasper,         toolNote: 'Nejlepší pro marketingový obsah a kampaně' },
  { id: 'programming', label: 'Programování & Vývoj',           rate: 0.35, tool: 'GitHub Copilot',  toolUrl: AFFILIATE_LINKS.github_copilot, toolNote: 'AI asistent přímo ve vašem editoru' },
  { id: 'copywriting', label: 'Copywriting & Tvorba obsahu',    rate: 0.50, tool: 'Claude Pro',      toolUrl: AFFILIATE_LINKS.claude,         toolNote: 'Nejlepší pro dlouhé texty v češtině' },
  { id: 'hr',          label: 'HR & Nábor',                     rate: 0.30, tool: 'ChatGPT Plus',    toolUrl: AFFILIATE_LINKS.chatgpt,        toolNote: 'Drafty inzerátů, hodnocení CV, onboarding' },
  { id: 'finance',     label: 'Finance & Účetnictví',           rate: 0.25, tool: 'ChatGPT Plus',    toolUrl: AFFILIATE_LINKS.chatgpt,        toolNote: 'Analýza dat, reporty a sumarizace' },
  { id: 'cs',          label: 'Zákaznický servis',               rate: 0.45, tool: 'ChatGPT Plus',    toolUrl: AFFILIATE_LINKS.chatgpt,        toolNote: 'Rychlé odpovědi a drafty e-mailů' },
  { id: 'admin',       label: 'Administrativa & Office',        rate: 0.35, tool: 'Copilot Pro',     toolUrl: AFFILIATE_LINKS.copilot,        toolNote: 'Integrovaný do Microsoft 365' },
  { id: 'education',   label: 'Vzdělávání & Výuka',             rate: 0.30, tool: 'Claude Pro',      toolUrl: AFFILIATE_LINKS.claude,         toolNote: 'Příprava materiálů a vysvětlování pojmů' },
  { id: 'other',       label: 'Ostatní',                        rate: 0.25, tool: 'ChatGPT Plus',    toolUrl: AFFILIATE_LINKS.chatgpt,        toolNote: 'Versatilní asistent pro každodenní práci' },
]

const HOURLY_RATE = 350

export default function SavingsCalc() {
  const [field, setField] = useState(FIELDS[0].id)
  const [hours, setHours] = useState(40)
  const [showResult, setShowResult] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const f = p.get('obor'); const h = p.get('hodiny')
    if (f && FIELDS.find(x => x.id === f)) { setField(f); setShowResult(true) }
    if (h && !isNaN(parseInt(h))) setHours(Math.min(80, Math.max(5, parseInt(h))))
  }, [])

  const sel = FIELDS.find(f => f.id === field)!
  const savedWeek  = Math.round(hours * sel.rate)
  const savedYear  = savedWeek * 52
  const savedMoney = savedYear * HOURLY_RATE

  const handleCalculate = () => {
    setShowResult(true)
    window.history.replaceState({}, '', `?obor=${field}&hodiny=${hours}`)
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-surface-200 p-6 mb-6 shadow-sm">
        <div className="mb-5">
          <label className="block text-sm font-semibold text-surface-800 mb-2">Váš obor</label>
          <select value={field} onChange={e => { setField(e.target.value); setShowResult(false) }}
            className="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500">
            {FIELDS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-surface-800 mb-2">
            Hodin práce týdně: <span className="text-brand-600 font-bold text-lg">{hours}h</span>
          </label>
          <input type="range" min={5} max={80} step={5} value={hours}
            onChange={e => { setHours(parseInt(e.target.value)); setShowResult(false) }}
            className="w-full accent-brand-600 cursor-pointer" />
          <div className="flex justify-between text-xs text-surface-400 mt-1"><span>5h</span><span>80h</span></div>
        </div>
        <button onClick={handleCalculate}
          className="w-full rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-700 active:scale-95 transition-all">
          Vypočítat úsporu →
        </button>
      </div>

      {showResult && (
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-surface-900 mb-5">Váš výsledek</h2>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { value: `${savedWeek}h`, label: 'ušetřeno týdně', color: 'text-brand-600' },
              { value: `${savedYear}h`, label: 'ušetřeno ročně',  color: 'text-brand-600' },
              { value: `${Math.round(savedMoney / 1000)}k Kč`, label: 'hodnota ročně', color: 'text-amber-500' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4 text-center border border-brand-100">
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-surface-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-surface-400 mb-5">
            * Odhad: průměrná sazba {HOURLY_RATE} Kč/h × {Math.round(sel.rate * 100)} % efektivity AI v oboru {sel.label.toLowerCase()}.
          </p>
          <div className="bg-white rounded-xl p-4 border border-brand-200 mb-4">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">Doporučený nástroj</p>
            <p className="text-lg font-bold text-surface-900">{sel.tool}</p>
            <p className="text-sm text-surface-500 mb-3">{sel.toolNote}</p>
            <a href={sel.toolUrl} target="_blank" rel="noopener noreferrer sponsored"
              className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors">
              Vyzkoušet {sel.tool} →
            </a>
          </div>
          <button onClick={handleShare} className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            {copied ? '✓ Odkaz zkopírován!' : '🔗 Sdílet výsledek'}
          </button>
        </div>
      )}
    </div>
  )
}
