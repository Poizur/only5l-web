'use client'

import { useState, useEffect } from 'react'

const QUESTIONS = [
  {
    id: 'field', text: 'Jaký je váš hlavní obor?',
    options: [
      { id: 'marketing',   label: '📣 Marketing & Sociální sítě' },
      { id: 'coding',      label: '💻 Programování & Vývoj' },
      { id: 'content',     label: '✍️ Tvorba obsahu & Copywriting' },
      { id: 'research',    label: '🔍 Výzkum & Analýza dat' },
      { id: 'general',     label: '🔧 Obecné použití / nevím' },
    ],
  },
  {
    id: 'budget', text: 'Kolik chcete měsíčně platit?',
    options: [
      { id: 'free', label: '🆓 Nic — jen zdarma varianty' },
      { id: 'low',  label: '💰 Do 500 Kč měsíčně (~$20)' },
      { id: 'mid',  label: '💳 Do 1 500 Kč měsíčně' },
      { id: 'high', label: '🚀 Bez limitu — chci nejlepší' },
    ],
  },
  {
    id: 'usecase', text: 'Co od AI potřebujete nejvíc?',
    options: [
      { id: 'writing',     label: '📝 Psaní textů a e-mailů' },
      { id: 'coding',      label: '⌨️ Pomoc s kódem' },
      { id: 'images',      label: '🎨 Generování obrázků' },
      { id: 'research',    label: '📚 Výzkum s citovanými zdroji' },
      { id: 'everything',  label: '🌐 Vše dohromady' },
    ],
  },
  {
    id: 'czech', text: 'Jak důležitá je podpora češtiny?',
    options: [
      { id: 'critical', label: '🇨🇿 Nezbytná — píšu hlavně česky' },
      { id: 'nice',     label: '👍 Vítaná, ale ne nutná' },
      { id: 'no',       label: '🌍 Nepotřebuji — pracuji anglicky' },
    ],
  },
  {
    id: 'team', text: 'Pracujete sami nebo s týmem?',
    options: [
      { id: 'solo',    label: '🧑 Sám/sama — freelancer nebo OSVČ' },
      { id: 'team',    label: '👥 Malý tým (2–10 lidí)' },
      { id: 'company', label: '🏢 Větší firma (10+ lidí)' },
    ],
  },
]

type Result = { tool: string; tagline: string; why: string; url: string; price: string; badge: string }

function getResult(a: Record<string, string>): Result {
  if (a.usecase === 'images')
    return { tool: 'ChatGPT Plus', tagline: 'Nejlepší pro generování obrázků', why: 'DALL-E 3 integrovaný přímo v ChatGPT je aktuálně nejlepší volba. Zvládne i všechny textové úkoly.', url: 'https://chat.openai.com/', price: '$20/měsíc (~460 Kč)', badge: '🎨 Nejlepší obrázky' }

  if (a.usecase === 'research')
    return { tool: 'Perplexity AI', tagline: 'Výzkum s citacemi zdrojů', why: 'Každá odpověď obsahuje citované zdroje. Ideální pro analýzy, fact-checking a výzkum.', url: 'https://www.perplexity.ai/', price: a.budget === 'free' ? 'Zdarma (5 Pro hledání/den)' : '$20/měsíc (~460 Kč)', badge: '🔍 Nejlepší pro výzkum' }

  if (a.usecase === 'coding' || a.field === 'coding')
    return { tool: 'GitHub Copilot', tagline: 'AI asistent přímo ve vašem editoru', why: 'Funguje v VS Code, JetBrains a dalších editorech. Autocomplete, generování funkcí a code review.', url: 'https://github.com/features/copilot', price: '$10/měsíc (~230 Kč)', badge: '💻 Nejlepší pro kód' }

  if (a.budget === 'free' && a.czech === 'critical')
    return { tool: 'Claude Free', tagline: 'Nejlepší zdarma varianta pro češtinu', why: 'Claude má ze všech AI nástrojů nejlepší češtinu. Bezplatná verze je štědřejší než ChatGPT Free.', url: 'https://claude.ai/', price: 'Zdarma', badge: '🇨🇿 Nejlepší čeština zdarma' }

  if (a.budget === 'free')
    return { tool: 'ChatGPT Free', tagline: 'Nejrozšířenější AI chatbot zdarma', why: 'Dobrý startovní bod. Omezený přístup k GPT-4o, ale pro základní použití stačí.', url: 'https://chat.openai.com/', price: 'Zdarma', badge: '🆓 Zdarma' }

  if ((a.usecase === 'writing' || a.field === 'content') && a.czech === 'critical')
    return { tool: 'Claude Pro', tagline: 'Nejlepší AI pro psaní v češtině', why: 'Claude má prokazatelně nejlepší češtinu. Pro copywriting v češtině je jednoznačně #1.', url: 'https://claude.ai/', price: '$20/měsíc (~460 Kč)', badge: '🇨🇿 Nejlepší čeština' }

  if (a.team === 'company')
    return { tool: 'ChatGPT Teams', tagline: 'ChatGPT pro celý tým', why: 'Správa uživatelů, sdílené GPTs a garantované nepoužití vašich dat pro trénink modelu.', url: 'https://chat.openai.com/', price: '$30/uživatel/měsíc', badge: '🏢 Pro firmy' }

  return { tool: 'ChatGPT Plus', tagline: 'Nejlepší volba pro většinu uživatelů', why: 'GPT-4o bez limitu, DALL-E 3, analýza dat, kód i webové vyhledávání. Nejuniverzálnější AI nástroj.', url: 'https://chat.openai.com/', price: '$20/měsíc (~460 Kč)', badge: '⭐ Doporučujeme' }
}

export default function ToolQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<Result | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const saved: Record<string, string> = {}
    QUESTIONS.forEach(q => { const v = p.get(q.id); if (v) saved[q.id] = v })
    if (Object.keys(saved).length === QUESTIONS.length) {
      setAnswers(saved); setResult(getResult(saved)); setStep(QUESTIONS.length)
    }
  }, [])

  const pick = (qId: string, optId: string) => {
    const next = { ...answers, [qId]: optId }
    setAnswers(next)
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      const r = getResult(next); setResult(r)
      const params = new URLSearchParams()
      Object.entries(next).forEach(([k, v]) => params.set(k, v))
      window.history.replaceState({}, '', `?${params}`)
    }
  }

  const share = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setAnswers({}); setResult(null); setStep(0)
    window.history.replaceState({}, '', window.location.pathname)
  }

  const pct = result ? 100 : Math.round((step / QUESTIONS.length) * 100)

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-surface-400 mb-1.5">
          <span>Otázka {Math.min(step + 1, QUESTIONS.length)} z {QUESTIONS.length}</span>
          <span>{pct} %</span>
        </div>
        <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-600 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {result ? (
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">Váš ideální nástroj</p>
          <h2 className="text-2xl font-extrabold text-surface-900 mb-1">{result.tool}</h2>
          <p className="text-surface-500 text-sm mb-3">{result.tagline}</p>
          <span className="inline-block text-xs bg-amber-100 text-amber-700 font-semibold px-3 py-1 rounded-full mb-4">{result.badge}</span>
          <div className="bg-white rounded-xl p-4 border border-brand-100 mb-5">
            <p className="text-sm text-surface-700 leading-relaxed mb-2">{result.why}</p>
            <p className="text-xs font-semibold text-surface-500">Cena: {result.price}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href={result.url} target="_blank" rel="noopener noreferrer sponsored"
              className="inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700 transition-colors">
              Vyzkoušet {result.tool} →
            </a>
            <button onClick={share}
              className="inline-flex items-center rounded-lg border border-brand-200 px-4 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-100 transition-colors">
              {copied ? '✓ Zkopírováno!' : '🔗 Sdílet výsledek'}
            </button>
          </div>
          <button onClick={reset} className="mt-4 text-xs text-surface-400 hover:text-surface-600 transition-colors block">
            ← Začít znovu
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-surface-900 mb-5">{QUESTIONS[step].text}</h2>
          <div className="space-y-3">
            {QUESTIONS[step].options.map(opt => (
              <button key={opt.id} onClick={() => pick(QUESTIONS[step].id, opt.id)}
                className="w-full text-left rounded-xl border border-surface-200 bg-white px-5 py-4 text-sm font-medium text-surface-800 hover:border-brand-400 hover:bg-brand-50 active:scale-[0.99] transition-all shadow-sm">
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
