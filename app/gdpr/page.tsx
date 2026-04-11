import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR & Ochrana soukromí",
  description: "Informace o zpracování osobních údajů na only5l.cz.",
};

export default function GdprPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 mb-4">
        GDPR & Ochrana soukromí
      </h1>
      <p className="text-sm text-surface-400 mb-10">Poslední aktualizace: leden 2025</p>

      <div className="prose-article space-y-6 text-surface-700 leading-relaxed">
        <p>
          Web <strong>only5l.cz</strong> (dále jen „web") zpracovává osobní údaje v souladu
          s nařízením GDPR (EU) 2016/679.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Co shromažďujeme</h2>
        <p>
          Web nepoužívá registraci ani newsletter. Neshromažďujeme žádné osobní údaje přímo.
          Třetí strany (Google Analytics, affiliate sítě) mohou shromažďovat anonymizovaná
          data o návštěvnosti dle jejich vlastních podmínek.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Cookies</h2>
        <p>
          Web může používat základní analytické cookies (Google Analytics) pro měření
          návštěvnosti. Nepoužíváme cookies pro cílenou reklamu.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Affiliate linky</h2>
        <p>
          Odkazujeme na třetí strany přes affiliate linky. Tyto weby mají vlastní
          podmínky ochrany soukromí, za které neneseme odpovědnost.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Kontakt</h2>
        <p>
          Dotazy ke zpracování osobních údajů:{" "}
          <a href="mailto:ahoj@only5l.cz" className="text-brand-600 hover:underline">
            ahoj@only5l.cz
          </a>
        </p>
      </div>
    </div>
  );
}
