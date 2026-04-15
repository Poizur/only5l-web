"use client";

import { useState } from "react";
import Link from "next/link";

const RAILWAY_URL =
  process.env.NEXT_PUBLIC_RAILWAY_URL ??
  "https://web-production-fc03c.up.railway.app";

const TOP10_TOOLS = [
  {
    rank: 1,
    name: "ChatGPT (OpenAI)",
    category: "Psaní a asistent",
    price: "Zdarma / $20/měs",
    freeTier: true,
    czech: "Částečně",
    why: "Nejuniverzálnější AI asistent. GPT-4o zvládá text, obrázky i kód. Ideální jako první AI nástroj pro každého.",
    tip: "Začni s bezplatnou verzí — GPT-4o je dostupný i zdarma s omezeným počtem zpráv.",
    trackingId: "chatgpt",
  },
  {
    rank: 2,
    name: "Claude (Anthropic)",
    category: "Psaní a analýza",
    price: "Zdarma / $20/měs",
    freeTier: true,
    czech: "Částečně",
    why: "Nejlepší pro dlouhé texty, analýzu dokumentů a přesné instrukce. Méně halucinuje než GPT.",
    tip: "Zkus Claude pro shrnutí dlouhých PDF nebo knih — 200K tokenů kontext je zatím unikátní.",
    trackingId: "claude",
  },
  {
    rank: 3,
    name: "Canva AI",
    category: "Grafika a vizuály",
    price: "Zdarma / €13/měs",
    freeTier: true,
    czech: "Částečně",
    why: "AI generování obrázků, Magic Write, šablony — vše v jednom editoru. Nejjednodušší cesta k profesionální grafice.",
    tip: "Magic Studio obsahuje desítky AI nástrojů. Vyzkoušej 'Remove Background' a 'Magic Expand'.",
    trackingId: "canva",
  },
  {
    rank: 4,
    name: "Perplexity AI",
    category: "Výzkum a vyhledávání",
    price: "Zdarma / $20/měs",
    freeTier: true,
    czech: "Částečně",
    why: "AI vyhledávač s citacemi ze zdrojů. Nahradí Google pro výzkum — dostaneš přímou odpověď s odkazy.",
    tip: "Použij 'Spaces' pro opakující se výzkumné projekty — Perplexity si pamatuje kontext.",
    trackingId: "perplexity",
  },
  {
    rank: 5,
    name: "GitHub Copilot",
    category: "Programování",
    price: "$10/měs (zdarma pro studenty)",
    freeTier: true,
    czech: "Ne",
    why: "Standardní nástroj pro každého vývojáře. Dokončuje kód, navrhuje funkce, vysvětluje chyby přímo ve VS Code.",
    tip: "Copilot Chat (Ctrl+I) je ještě silnější než autocomplete — piš co chceš napsat, ne jak to napsat.",
    trackingId: "githubcopilot",
  },
  {
    rank: 6,
    name: "Make (Integromat)",
    category: "Automatizace",
    price: "Zdarma / €9/měs",
    freeTier: true,
    czech: "Ano (česká firma!)",
    why: "Automatizuj opakující se úkoly bez kódu. Propojí jakékoli dvě aplikace. Česká firma s českou podporou.",
    tip: "Začni scénářem 'Gmail → Notion' nebo 'Typeform → Google Sheets'. Hotovo za 15 minut.",
    trackingId: "make",
  },
  {
    rank: 7,
    name: "ElevenLabs",
    category: "Hlasová syntéza",
    price: "Zdarma / $5/měs",
    freeTier: true,
    czech: "Částečně",
    why: "Nejrealističtější AI hlasy na trhu. Klonuj svůj hlas, dabuj videa do češtiny, vytvoř audiobook.",
    tip: "Bezplatný plán nabídne 10 000 znaků/měs — stačí na krátká videa nebo podcast intro.",
    trackingId: "elevenlabs",
  },
  {
    rank: 8,
    name: "Notion AI",
    category: "Produktivita",
    price: "$10/měs (jako add-on)",
    freeTier: false,
    czech: "Částečně",
    why: "Pokud už používáš Notion, AI add-on ti umožní ptát se na obsah databází, generovat zápisy z meetingů a shrnutí stránek.",
    tip: "Funkce 'Ask AI' nad celým workspace je unikátní — zeptej se na cokoliv ze svých poznámek.",
    trackingId: "notionai",
  },
  {
    rank: 9,
    name: "Cursor",
    category: "Kódování",
    price: "Zdarma / $20/měs",
    freeTier: true,
    czech: "Ne",
    why: "Editor postavený na AI — napíšeš co chceš, Cursor napíše kód. Ideální pro non-vývojáře i seniory.",
    tip: "Composer (Cmd+I) dokáže přepsat celý soubor nebo vytvořit nový z popisu. Zkus to na CSS.",
    trackingId: "cursor",
  },
  {
    rank: 10,
    name: "Midjourney",
    category: "Generování obrázků",
    price: "od $10/měs",
    freeTier: false,
    czech: "Ne",
    why: "Nejkvalitnější AI obrázky na trhu. Umělecké styly, fotorealistika, produktová fotografie — vše z textového popisu.",
    tip: "Parametry --ar 16:9 --style raw --v 6.1 dávají nejlepší výsledky pro fotorealistické obrázky.",
    trackingId: "midjourney",
  },
];

export default function PruvodceAiPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "unlocked" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(`${RAILWAY_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "pruvodce-ai" }),
      });
      if (res.ok || res.status === 409) {
        // 409 = already subscribed — show content anyway
        setStatus("unlocked");
      } else {
        throw new Error("Server error");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Nepodařilo se uložit email. Zkus to znovu.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Domů</Link>
        <span>/</span>
        <span className="text-surface-600">Průvodce AI nástroji</span>
      </nav>

      {/* Header */}
      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          📘 Zdarma ke stažení
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 mb-4">
          Top 10 AI nástrojů<br />pro česky mluvící (2026)
        </h1>
        <p className="text-surface-500 text-lg leading-relaxed max-w-xl mx-auto">
          Poctivý průvodce s hodnoceními, cenami v Kč, tipy pro začátečníky a informací
          o češtině. Testováno na reálných projektech.
        </p>
      </header>

      {/* Teaser — first 2 tools visible always */}
      <div className="space-y-4 mb-8">
        {TOP10_TOOLS.slice(0, 2).map((tool) => (
          <ToolCard key={tool.rank} tool={tool} />
        ))}
      </div>

      {/* Gate / Unlock */}
      {status !== "unlocked" ? (
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-white p-8 text-center mb-8">
          <p className="text-2xl font-bold mb-2">🔓 Odemkni zbývajících 8 nástrojů</p>
          <p className="text-brand-100 mb-6 text-sm">
            Zadej email a získej přístup k celému průvodci + týdenní AI novinky zdarma.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="tvuj@email.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-xl bg-white text-brand-700 font-bold hover:bg-brand-50 transition-colors disabled:opacity-70 shrink-0"
            >
              {status === "loading" ? "Ukládám…" : "Odemknout →"}
            </button>
          </form>
          {status === "error" && (
            <p className="mt-3 text-red-300 text-sm">{errorMsg}</p>
          )}
          <p className="mt-3 text-brand-200 text-xs">Bez spamu · kdykoli se odhlásíš</p>
        </div>
      ) : (
        /* Full guide — unlocked */
        <>
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 font-medium mb-6 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
            </svg>
            Přidán do newsletteru. Průvodce odemčen!
          </div>

          <div className="space-y-4">
            {TOP10_TOOLS.slice(2).map((tool) => (
              <ToolCard key={tool.rank} tool={tool} />
            ))}
          </div>

          {/* Bonus section */}
          <div className="mt-10 rounded-2xl bg-surface-50 border border-surface-200 p-6">
            <h2 className="text-xl font-bold text-surface-900 mb-4">🎁 Bonus: Jak začít za víkend</h2>
            <ol className="space-y-3 text-sm text-surface-700">
              <li className="flex gap-3"><span className="font-bold text-brand-600 shrink-0">1.</span><span><strong>Pátek večer:</strong> Zaregistruj se na ChatGPT (zdarma) a vyzkoušej 3 věci: napiš email, shrni článek, polož odbornou otázku.</span></li>
              <li className="flex gap-3"><span className="font-bold text-brand-600 shrink-0">2.</span><span><strong>Sobota:</strong> Zkus Claude pro delší analýzu — nahraj PDF a zeptej se na klíčové body. Porovnej s ChatGPT.</span></li>
              <li className="flex gap-3"><span className="font-bold text-brand-600 shrink-0">3.</span><span><strong>Neděle:</strong> Vyber jeden nástroj podle svého oboru (Make pro marketing, Copilot pro kód, Canva pro grafiku) a nastav první automatizaci nebo workflow.</span></li>
              <li className="flex gap-3"><span className="font-bold text-brand-600 shrink-0">4.</span><span><strong>Pondělí:</strong> Použij vybraný AI nástroj na první skutečný pracovní úkol. Zaznamenej kolik ti ušetřil čas.</span></li>
            </ol>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/nastroje"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
            >
              Procházet všechny nástroje s filtry →
            </Link>
          </div>
        </>
      )}

      {/* SEO footer note */}
      <p className="mt-10 text-xs text-surface-400 text-center">
        Průvodce je aktualizován čtvrtletně. Poslední aktualizace: duben 2026.
        Stránka obsahuje affiliate odkazy —{" "}
        <Link href="/disclaimer" className="underline hover:text-surface-600">přečti si disclaimer</Link>.
      </p>
    </div>
  );
}

function ToolCard({ tool }: { tool: (typeof TOP10_TOOLS)[0] }) {
  return (
    <div className="bg-white border border-surface-200 rounded-2xl p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-lg font-extrabold text-brand-600">
          {tool.rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <h3 className="font-bold text-surface-900">{tool.name}</h3>
            <span className="text-xs bg-surface-100 text-surface-500 px-2 py-0.5 rounded font-medium">
              {tool.category}
            </span>
            {tool.freeTier && (
              <span className="text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded font-medium">
                Free plán
              </span>
            )}
          </div>
          <p className="text-sm text-surface-600 leading-relaxed mb-2">{tool.why}</p>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-surface-400">
            <span>💰 {tool.price}</span>
            <span>🇨🇿 {tool.czech}</span>
          </div>
          <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-800">
            💡 <strong>Tip:</strong> {tool.tip}
          </div>
        </div>
        <a
          href={`/track/affiliate/${tool.trackingId}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="shrink-0 px-3 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors"
        >
          Vyzkoušet →
        </a>
      </div>
    </div>
  );
}
