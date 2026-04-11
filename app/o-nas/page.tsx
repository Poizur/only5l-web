import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nás",
  description: "Jsme malý tým nadšenců, kteří testují AI nástroje za vás. Poctivě, v češtině, bez sponzorovaného obsahu.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 mb-4">O nás</h1>
      <p className="text-xl text-surface-500 mb-10 leading-relaxed">
        Testujeme AI nástroje za tebe. Poctivě, v češtině, bez zbytečného tlachání.
      </p>

      <div className="prose-article space-y-6 text-surface-700 leading-relaxed">
        <p>
          <strong>only5l.cz</strong> vzniklo z jednoduché frustrace: na internetu je tisíce recenzí
          AI nástrojů, ale téměř žádné v češtině, s cenami v Kč a s pohledem na to, co
          nás jako Čechy skutečně zajímá — GDPR, česká podpora, reálné použití.
        </p>

        <p>
          Naším cílem není recenzovat vše. Vybíráme jen to nejlepší — odtud název{" "}
          <strong>only 5 links</strong>. Pro každou kategorii hledáme přesně 5 nástrojů,
          které opravdu stojí za to.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Jak testujeme</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Každý nástroj skutečně používáme — ne jen čteme press release</li>
          <li>Testujeme českou jazykovou podporu u každého AI nástroje</li>
          <li>Uvádíme reálné ceny v Kč (ne jen "od $X")</li>
          <li>Kontrolujeme GDPR compliance a umístění serverů</li>
          <li>Hodnotíme na škále 0–10 podle 5 kritérií</li>
        </ul>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Affiliate linky</h2>
        <p>
          Články obsahují affiliate linky. Pokud si přes náš odkaz zaplatíš nástroj,
          dostaneme malou provizi — pro tebe za stejnou cenu. Tohle nám umožňuje web
          provozovat a testovat nástroje na vlastní kůži. Nikdy nás ale provize
          neovlivní v hodnocení — záporné věci píšeme stejně jako kladné.
        </p>

        <h2 className="text-xl font-bold text-surface-900 mt-10 mb-3">Kontakt</h2>
        <p>
          Máš tip na nástroj? Narazil jsi na chybu? Napiš nám:{" "}
          <a href="mailto:ahoj@only5l.cz" className="text-brand-600 hover:underline font-medium">
            ahoj@only5l.cz
          </a>
        </p>
      </div>
    </div>
  );
}
