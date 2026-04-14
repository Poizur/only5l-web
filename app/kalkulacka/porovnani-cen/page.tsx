import type { Metadata } from 'next'
import { site } from '@/lib/site'
import PriceComparison from '@/components/calculators/PriceComparison'

export const metadata: Metadata = {
  title: 'Srovnání cen AI nástrojů v Kč 2026 — ChatGPT, Claude, Gemini',
  description: 'Přehledná tabulka cen AI nástrojů přepočtená na koruny. Aktuální kurz USD/CZK. ChatGPT, Claude, Gemini, Perplexity, Copilot.',
  openGraph: {
    title: 'Srovnání cen AI nástrojů v Kč — only5l.cz',
    description: 'Kolik stojí ChatGPT, Claude, Gemini a Perplexity v korunách? Přehled všech plánů.',
    url: `${site.url}/kalkulacka/porovnani-cen`,
  },
  alternates: { canonical: `${site.url}/kalkulacka/porovnani-cen` },
}

export default function PricesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <span className="inline-block text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">
          💱 Srovnání cen
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight mb-4">
          Ceny AI nástrojů v Kč
        </h1>
        <p className="text-lg text-surface-500 max-w-xl mx-auto">
          Aktuální přehled cen ChatGPT, Claude, Gemini, Perplexity a Copilot přepočtených na koruny živým kurzem.
        </p>
      </div>
      <PriceComparison />
    </div>
  )
}
