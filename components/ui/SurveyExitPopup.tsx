'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'only5l_survey_shown'
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000
const SURVEY_URL = 'https://form.typeform.com/to/Dq4YtnKi'

export default function SurveyExitPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && Date.now() - parseInt(stored, 10) < COOLDOWN_MS) return
    } catch {}

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setVisible(true)
        try { localStorage.setItem(STORAGE_KEY, Date.now().toString()) } catch {}
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 10000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 pointer-events-none"
      style={{ animation: 'slideUp 0.3s ease-out' }}
    >
      <style>{`@keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }`}</style>
      <div className="max-w-2xl mx-auto pointer-events-auto bg-white border border-brand-200 rounded-2xl shadow-2xl px-5 py-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-surface-800">
          📊 Líbil se ti článek? Zúčastni se průzkumu →
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Zúčastnit se
          </a>
          <button
            onClick={() => setVisible(false)}
            className="text-surface-400 hover:text-surface-600 transition-colors p-1 text-xl leading-none"
            aria-label="Zavřít"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
