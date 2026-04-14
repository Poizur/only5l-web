import type { Metadata } from 'next'
import { site } from '@/lib/site'
import SavingsCalc from '@/components/calculators/SavingsCalc'

export const metadata: Metadata = {
  title: 'Kalkulačka úspory s AI — kolik hodin a peněz ušetříte?',
  description: 'Zjistěte kolik hodin a peněz ušetříte s AI nástroji podle vašeho oboru. Odhad zdarma, výsledek okamžitě.',
  openGraph: {
    title: 'Kalkulačka úspory s AI — only5l.cz',
    description: 'Zadejte obor a počet hodin — dostanete realistický odhad úspory s AI.',
    url: `${site.url}/kalkulacka/uspora-s-ai`,
  },
  alternates: { canonical: `${site.url}/kalkulacka/uspora-s-ai` },
}

export default function SavingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <span className="inline-block text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">
          🧮 Kalkulačka
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight mb-4">
          Kolik ušetříte s AI?
        </h1>
        <p className="text-lg text-surface-500 max-w-xl mx-auto">
          Zadejte svůj obor a počet pracovních hodin týdně. Dostanete realistický odhad časové i finanční úspory + doporučený nástroj.
        </p>
      </div>
      <SavingsCalc />
      <p className="text-center text-xs text-surface-400 mt-8">
        Odhady vychází z analýz efektivity AI nástrojů. Skutečné výsledky se liší dle použití.
      </p>
    </div>
  )
}
