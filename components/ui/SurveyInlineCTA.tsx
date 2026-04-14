const SURVEY_URL = 'https://form.typeform.com/to/Dq4YtnKi'

export default function SurveyInlineCTA() {
  return (
    <div className="not-prose my-8 rounded-xl border border-brand-100 bg-brand-50 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm font-semibold text-surface-800">
        Používáš AI nástroje? Řekni nám jak →
      </p>
      <a
        href={SURVEY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
      >
        Zúčastnit se průzkumu
      </a>
    </div>
  )
}
