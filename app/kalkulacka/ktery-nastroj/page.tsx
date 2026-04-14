import type { Metadata } from 'next'
import { site } from '@/lib/site'
import ToolQuiz from '@/components/calculators/ToolQuiz'

export const metadata: Metadata = {
  title: 'Který AI nástroj je pro vás nejlepší? — Kvíz 5 otázek',
  description: 'Odpovězte na 5 otázek a zjistěte který AI nástroj je nejlepší pro váš obor, rozpočet a způsob práce.',
  openGraph: {
    title: 'Který AI nástroj je pro vás? — Kvíz — only5l.cz',
    description: '5 otázek → personalizované doporučení AI nástroje s affiliate odkazem.',
    url: `${site.url}/kalkulacka/ktery-nastroj`,
  },
  alternates: { canonical: `${site.url}/kalkulacka/ktery-nastroj` },
}

export default function QuizPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <span className="inline-block text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">
          🎯 Kvíz
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight mb-4">
          Který AI nástroj je pro vás?
        </h1>
        <p className="text-lg text-surface-500 max-w-xl mx-auto">
          5 rychlých otázek → doporučení šité na míru vašemu oboru, rozpočtu a způsobu práce.
        </p>
      </div>
      <ToolQuiz />
      <p className="text-center text-xs text-surface-400 mt-8">
        Doporučení vychází z testování nástrojů redakcí only5l.cz. Obsahuje affiliate linky.
      </p>
    </div>
  )
}
// rebuild
