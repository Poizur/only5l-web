import type { Metadata } from "next";
import { site } from "@/lib/site";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: `Newsletter — 5 AI novinek týdně | ${site.name}`,
  description:
    "Každý pátek pošleme 5 nejdůležitějších AI novinek týdne přímo do tvého inboxu. Zdarma, bez spamu.",
};

const BENEFITS = [
  {
    icon: "⚡",
    title: "Breaking news jako první",
    text: "Nové AI modely, launche nástrojů a důležité zprávy – vždy v pátek ranní edici.",
  },
  {
    icon: "🎯",
    title: "Kurátorováno, ne agregováno",
    text: "Agent sleduje přes 20 zdrojů a vybere jen to, co skutečně stojí za přečtení.",
  },
  {
    icon: "🇨🇿",
    title: "V češtině, pro český trh",
    text: "Zaměřujeme se na to, co je dostupné a relevantní pro české uživatele.",
  },
  {
    icon: "🆓",
    title: "Zdarma, navždy",
    text: "Newsletter je a zůstane bezplatný. Žádná prémiová tier, žádné paywall.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">📬</div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
          Newsletter
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 mb-4">
          5 AI novinek každý pátek
        </h1>
        <p className="text-lg text-surface-500 leading-relaxed">
          Přihlásí se jednou, zůstaneš v obraze. Každý pátek vybíráme 5 nejdůležitějších
          novinek ze světa AI — bez plnění, bez clickbaitu.
        </p>
      </div>

      {/* Signup form */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-surface-200 shadow-sm mb-12">
        <h2 className="text-xl font-bold text-surface-900 mb-2">Přihlásit se k odběru</h2>
        <p className="text-sm text-surface-500 mb-5">
          První email přijde příští pátek. Odhlásit se můžeš kdykoli jedním kliknutím.
        </p>
        <NewsletterForm />
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {BENEFITS.map((b) => (
          <div key={b.icon} className="flex gap-3 p-4 rounded-xl border border-surface-200">
            <span className="text-2xl flex-shrink-0">{b.icon}</span>
            <div>
              <p className="font-semibold text-surface-900 mb-1">{b.title}</p>
              <p className="text-sm text-surface-500 leading-relaxed">{b.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Social proof placeholder */}
      <div className="text-center p-6 rounded-2xl bg-surface-50 border border-surface-200">
        <p className="text-surface-500 text-sm">
          Přidej se k čtenářům AIkompass.cz · Vychází každý pátek v 11:00
        </p>
      </div>
    </div>
  );
}
