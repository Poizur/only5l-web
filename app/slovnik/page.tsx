import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Slovník AI pojmů – přehledný průvodce v češtině | AI Kompass",
  description:
    "Vysvětlení 40+ AI pojmů v češtině bez technického žargonu. Prompt, token, LLM, RAG, hallucination, fine-tuning a další — jasně a srozumitelně.",
};

interface Term {
  term: string;
  en?: string;
  definition: string;
  category: "základy" | "modely" | "technické" | "použití";
}

const TERMS: Term[] = [
  // Základy
  {
    term: "Umělá inteligence (AI)",
    en: "Artificial Intelligence",
    definition:
      "Obor informatiky, jehož cílem je vytvářet systémy schopné provádět úkoly, které normálně vyžadují lidskou inteligenci — rozpoznávání řeči, překlad, rozhodování nebo tvorbu textu.",
    category: "základy",
  },
  {
    term: "Velký jazykový model (LLM)",
    en: "Large Language Model",
    definition:
      "Typ AI modelu trénovaný na obrovském množství textu (stovky miliard slov). LLM jako GPT-4, Claude nebo Gemini dokáží generovat, překládat a analyzovat text. Fungují na principu predikce nejpravděpodobnějšího dalšího slova.",
    category: "modely",
  },
  {
    term: "Generativní AI",
    en: "Generative AI",
    definition:
      "AI systémy schopné tvořit nový obsah — text, obrázky, hudbu nebo video. Na rozdíl od klasické AI, která jen klasifikuje nebo předpovídá, generativní AI aktivně vytváří. Příklady: ChatGPT, Midjourney, DALL-E.",
    category: "základy",
  },
  {
    term: "Prompt",
    en: "Prompt",
    definition:
      "Vstupní text nebo instrukce, které zadáváš AI modelu. Kvalita promptu přímo ovlivňuje kvalitu výstupu. Čím konkrétnější a strukturovanější prompt, tím lepší výsledek. Viz také: promptování.",
    category: "použití",
  },
  {
    term: "Token",
    en: "Token",
    definition:
      "Základní jednotka textu, se kterou AI pracuje. Token není totéž co slovo — může to být slabika, celé slovo nebo interpunkce. Zhruba 1 000 tokenů odpovídá cca 750 slovům v angličtině, v češtině je tokenizace méně efektivní (čeština má více tokenů na slovo).",
    category: "technické",
  },
  {
    term: "Halucinace",
    en: "Hallucination",
    definition:
      "Jev, kdy AI s jistotou uvede nepravdivou informaci — vymyšlenou citaci, neexistující zákon nebo špatné číslo. AI 'neví, že neví', proto halucinace zní přesvědčivě. Vždy ověřuj fakta, data a citace z AI výstupu.",
    category: "základy",
  },
  {
    term: "Kontextové okno",
    en: "Context Window",
    definition:
      "Maximální množství textu (v tokenech), které AI zpracuje v jedné konverzaci. GPT-4o má ~128 000 tokenů, Claude 3.5 až 200 000. Po překročení limitu AI 'zapomene' starší části konverzace. Čím větší okno, tím déle si AI pamatuje kontext.",
    category: "technické",
  },
  {
    term: "Doladění (fine-tuning)",
    en: "Fine-tuning",
    definition:
      "Proces, při kterém se obecný AI model dál trénuje na specializovaných datech pro konkrétní účel — například lékařský AI asistent trénovaný na lékařských textech. Fine-tuning přizpůsobuje styl, terminologii a chování modelu.",
    category: "technické",
  },
  {
    term: "RAG",
    en: "Retrieval-Augmented Generation",
    definition:
      "Technika, která kombinuje vyhledávání v externích dokumentech s generováním odpovědi. Místo aby AI spoléhala jen na natrénované znalosti, nejprve vyhledá relevantní dokumenty a pak z nich odpovídá. Snižuje halucinace, umožňuje práci s aktuálními daty.",
    category: "technické",
  },
  {
    term: "Promptování",
    en: "Prompt Engineering",
    definition:
      "Umění psát efektivní instrukce pro AI. Zahrnuje techniky jako: zadání role ('Jsi zkušený copywriter'), specifikace formátu ('Odpověz v odrážkách'), vložení kontextu a iterativní upřesňování. Dobrý prompt dramaticky zlepší výsledky.",
    category: "použití",
  },
  {
    term: "Základní model",
    en: "Foundation Model",
    definition:
      "Velký AI model trénovaný na obecných datech, který slouží jako základ pro další specializaci. GPT-4, Claude, Gemini nebo Llama jsou základní modely. Na jejich základě vznikají specifičtější aplikace přes fine-tuning nebo RAG.",
    category: "modely",
  },
  {
    term: "Multimodální AI",
    en: "Multimodal AI",
    definition:
      "AI, která pracuje s více typy vstupů — textem, obrázky, zvukem nebo videem zároveň. GPT-4o je multimodální: dokáže analyzovat fotografii a odpovídat na ni textem. Opak je pouze textový (text-only) model.",
    category: "modely",
  },
  {
    term: "GPT",
    en: "Generative Pre-trained Transformer",
    definition:
      "Architektura neuronové sítě vyvinutá OpenAI, která stojí za ChatGPT. Zkratka znamená 'generativní předtrénovaný transformer'. Transformer je typ sítě, která zpracovává text po tokenech s mechanismem pozornosti (attention).",
    category: "modely",
  },
  {
    term: "Transformer",
    en: "Transformer",
    definition:
      "Architektura neuronové sítě z roku 2017 (paper 'Attention is All You Need'), která revolučně změnila NLP. Transformer zpracovává vstupní sekvenci paralelně pomocí mechanismu self-attention, což umožňuje učení dlouhých závislostí v textu.",
    category: "technické",
  },
  {
    term: "Embeddingy",
    en: "Embeddings",
    definition:
      "Číselná reprezentace textu (nebo obrázků) v mnohorozměrném vektorovém prostoru. Podobné texty mají blízké vektory. Embeddingy umožňují AI porovnávat sémantický význam slov a vět, nikoliv jen jejich znaky.",
    category: "technické",
  },
  {
    term: "Teplotní parametr",
    en: "Temperature",
    definition:
      "Nastavení, které ovlivňuje 'kreativitu' výstupu AI. Nízká teplota (0–0.3): deterministické, předvídatelné odpovědi — vhodné pro fakta a kód. Vysoká teplota (0.7–1): rozmanitější, kreativnější výstupy — vhodné pro brainstorming.",
    category: "technické",
  },
  {
    term: "Systémový prompt",
    en: "System Prompt",
    definition:
      "Instrukce zadaná AI modelu na začátku konverzace, která definuje jeho roli, chování a omezení. Uživatel ho obvykle nevidí. Například: 'Jsi zákaznický asistent firmy X. Odpovídej jen česky. Neposkytuj ceny bez ověření.'",
    category: "použití",
  },
  {
    term: "Few-shot learning",
    en: "Few-shot Learning",
    definition:
      "Technika, kdy AI dostane v promptu několik příkladů vstupu a výstupu, aby pochopila požadovaný vzor — bez nutnosti přetrénování. Například: ukážeš 3 příklady konverze textů do JSON a AI pokračuje ve stejném formátu.",
    category: "použití",
  },
  {
    term: "Zero-shot",
    en: "Zero-shot",
    definition:
      "Schopnost AI zvládnout úkol bez jakýchkoli příkladů v promptu — pouze na základě přirozeného jazyka instrukce. 'Přelož tento text do němčiny' je zero-shot prompt, protože neuvádíš žádný příklad překladu.",
    category: "použití",
  },
  {
    term: "Chain-of-Thought",
    en: "Chain-of-Thought (CoT)",
    definition:
      "Technika promptování, kdy AI vybídneš k postupnému uvažování před finální odpovědí. Přidáním 'Uvaž krok za krokem' nebo 'Think step by step' do promptu výrazně zlepšíš výsledky u logických a matematických úloh.",
    category: "použití",
  },
  {
    term: "RLHF",
    en: "Reinforcement Learning from Human Feedback",
    definition:
      "Metoda trénování, při níž lidé hodnotí odpovědi AI a model se učí preferovat odpovědi, které lidé označí jako lepší. RLHF je klíčový pro to, aby ChatGPT nebo Claude odpovídaly přirozeně a bezpečně.",
    category: "technické",
  },
  {
    term: "Zarovnání AI",
    en: "AI Alignment",
    definition:
      "Výzkumná oblast zaměřená na to, aby AI systémy jednaly v souladu s lidskými hodnotami a záměry. Problém: AI optimalizovaná na úzký cíl může dosáhnout cíle způsoby, které jsou škodlivé nebo nečekané.",
    category: "základy",
  },
  {
    term: "AGI",
    en: "Artificial General Intelligence",
    definition:
      "Hypotetická AI schopná provádět jakýkoli intelektuální úkol stejně dobře jako člověk. Dnešní AI jsou 'narrow AI' — výjimeční v konkrétních úkolech, ale bez obecného porozumění. AGI zatím neexistuje; OpenAI i Anthropic uvádí, že se k ní blíží.",
    category: "základy",
  },
  {
    term: "Vektorová databáze",
    en: "Vector Database",
    definition:
      "Specializovaná databáze ukládající embeddingy (vektory). Umožňuje rychlé vyhledávání sémanticky podobného obsahu — základ RAG systémů. Příklady: Pinecone, Weaviate, pgvector pro PostgreSQL.",
    category: "technické",
  },
  {
    term: "Inference",
    en: "Inference",
    definition:
      "Fáze, kdy trénovaný AI model generuje odpovědi na nové vstupy — v protikladu k trénovací fázi. Každé použití ChatGPT nebo Claude je inference. Inference je výpočetně nákladná, proto cloudové AI účtují podle počtu tokenů.",
    category: "technické",
  },
  {
    term: "Open source AI",
    en: "Open Source AI",
    definition:
      "AI modely s veřejně dostupnými váhami (parametry), které lze stáhnout a provozovat lokálně. Příklady: Llama (Meta), Mistral, Falcon. Výhody: soukromí, nulové náklady na API. Nevýhody: vyžaduje výkonný hardware.",
    category: "modely",
  },
  {
    term: "API",
    en: "Application Programming Interface",
    definition:
      "Rozhraní, přes které vývojáři komunikují s AI modelem z vlastní aplikace. OpenAI, Anthropic i Google nabízejí API — platíš podle počtu tokenů. Umožňuje zabudovat AI do webů, aplikací nebo automatizovaných procesů.",
    category: "technické",
  },
  {
    term: "Agentní AI",
    en: "Agentic AI / AI Agent",
    definition:
      "AI systém, který sám plánuje a provádí série kroků k dosažení cíle — přistupuje k internetu, spouští kód, čte soubory. Na rozdíl od chatbota, který odpovídá na otázky, agent sám rozhoduje, jaké nástroje použije.",
    category: "použití",
  },
  {
    term: "Jailbreak",
    en: "Jailbreak",
    definition:
      "Technika, kdy uživatel obchází bezpečnostní omezení AI modelu pomocí chytře formulovaných promptů. Například přinutit AI, aby ignorovala svá pravidla přes roleplay scénář. Výrobci AI tyto mezery průběžně záplatují.",
    category: "použití",
  },
  {
    term: "Znalostní hranice",
    en: "Knowledge Cutoff",
    definition:
      "Datum, po které AI model nemá žádné informace, protože byl trénován na datech pouze do tohoto data. GPT-4o má cutoff v dubnu 2024, Claude 3.5 v dubnu 2024. AI s webovým přístupem (Perplexity, ChatGPT s Search) toto omezení obchází.",
    category: "modely",
  },
  {
    term: "Vícestupňové uvažování",
    en: "Multi-step Reasoning",
    definition:
      "Schopnost AI řešit komplexní problémy rozdělením na kroky. Modely jako o1 nebo Claude 3.5 Sonnet jsou v tom výrazně lepší než starší verze. Klíčové pro matematiku, logiku a víceúrovňové analýzy.",
    category: "modely",
  },
  {
    term: "Neuronová síť",
    en: "Neural Network",
    definition:
      "Matematický model inspirovaný strukturou mozku, tvořený vrstvami vzájemně propojených uzlů (neuronů). Každé spojení má váhu, která se upravuje při trénování. Hluboké neuronové sítě (deep learning) jsou základem moderní AI.",
    category: "technické",
  },
  {
    term: "Parametry modelu",
    en: "Model Parameters",
    definition:
      "Číselné hodnoty (váhy) v neuronové síti, které si model 'zapamatoval' při trénování. GPT-4 má odhadem 1,8 bilionu parametrů. Více parametrů obecně znamená větší kapacitu, ale i vyšší výpočetní nároky.",
    category: "technické",
  },
  {
    term: "Přetrénování (overfitting)",
    en: "Overfitting",
    definition:
      "Situace, kdy model příliš 'memoruje' trénovací data a špatně generalizuje na nové příklady. Jako student, který se naučil odpovědi na paměť, ale nerozumí principům — selže při nové otázce.",
    category: "technické",
  },
  {
    term: "Inference API",
    en: "Inference API",
    definition:
      "Cloudová služba, přes níž přistupuješ k AI modelu bez nutnosti vlastního hardwaru. Platíš za použití — typicky za 1 000 tokenů vstupu + výstupu. Příklady: OpenAI API, Anthropic API, Google Vertex AI.",
    category: "technické",
  },
  {
    term: "Tokenizace",
    en: "Tokenization",
    definition:
      "Proces rozdělení textu na tokeny před zpracováním AI modelem. Různé jazyky se tokenizují různě efektivně — angličtina průměrně 1 token/slovo, čeština 1,5–2 tokeny/slovo. Proto jsou delší české texty dražší na zpracování.",
    category: "technické",
  },
  {
    term: "Střežená generace",
    en: "Guardrails",
    definition:
      "Bezpečnostní mechanismy zabudované do AI modelu, které brání generování škodlivého obsahu — návody k výrobě zbraní, nenávistné projevy, dezinformace. Různé modely mají různě přísné guardrails.",
    category: "základy",
  },
  {
    term: "Distilace",
    en: "Knowledge Distillation",
    definition:
      "Technika, kdy se menší 'studentský' model trénuje na výstupech většího 'učitelského' modelu. Výsledek je kompaktnější model s podobnými schopnostmi. Příklad: Llama 3 8B je částečně distilovaná z větších modelů.",
    category: "technické",
  },
  {
    term: "Multiagentní systém",
    en: "Multi-agent System",
    definition:
      "Architektura, kde více AI agentů spolupracuje na řešení komplexního úkolu. Jeden agent plánuje, druhý vyhledává, třetí píše kód. Umožňuje paralelizaci a specializaci — každý agent dělá to, co umí nejlépe.",
    category: "použití",
  },
  {
    term: "Embedding model",
    en: "Embedding Model",
    definition:
      "Specializovaný model, který převádí text na vektory (embeddingy) pro sémantické vyhledávání. Liší se od generativního LLM — nevytváří text, jen ho reprezentuje číselně. Příklady: OpenAI text-embedding-3, Cohere Embed.",
    category: "modely",
  },
];

const CATEGORIES = ["základy", "modely", "technické", "použití"] as const;
const CATEGORY_LABELS: Record<string, string> = {
  základy:  "Základní pojmy",
  modely:   "Modely a architektury",
  technické: "Technické pojmy",
  použití:  "Použití a techniky",
};

function sortedTerms(category: string) {
  return TERMS.filter((t) => t.category === category).sort((a, b) =>
    a.term.localeCompare(b.term, "cs")
  );
}

export default function SlovnikPage() {
  const allSorted = [...TERMS].sort((a, b) => a.term.localeCompare(b.term, "cs"));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
          Slovník
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-surface-900 mb-4">
          Slovník AI pojmů
        </h1>
        <p className="text-xl text-surface-500 max-w-2xl leading-relaxed">
          {TERMS.length} pojmů vysvětlených v češtině — bez technického žargonu.
          Klikni na kategorii nebo prohledej abecedně.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {CATEGORIES.map((cat) => {
          const count = TERMS.filter((t) => t.category === cat).length;
          return (
            <a
              key={cat}
              href={`#${cat}`}
              className="p-4 rounded-xl border border-surface-200 hover:border-brand-300 hover:bg-brand-50 transition-colors text-center"
            >
              <div className="text-2xl font-bold text-brand-600">{count}</div>
              <div className="text-sm text-surface-600 mt-1">{CATEGORY_LABELS[cat]}</div>
            </a>
          );
        })}
      </div>

      {/* Terms by category */}
      {CATEGORIES.map((cat) => (
        <section key={cat} id={cat} className="mb-14 scroll-mt-20">
          <h2 className="text-2xl font-bold text-surface-900 mb-6 pb-3 border-b border-surface-200">
            {CATEGORY_LABELS[cat]}
          </h2>
          <dl className="space-y-6">
            {sortedTerms(cat).map((t) => (
              <div
                key={t.term}
                className="p-5 rounded-xl bg-surface-50 border border-surface-200 hover:border-brand-200 transition-colors"
              >
                <dt className="flex flex-wrap items-baseline gap-2 mb-2">
                  <span className="text-lg font-bold text-surface-900">{t.term}</span>
                  {t.en && (
                    <span className="text-sm text-surface-400 font-mono">{t.en}</span>
                  )}
                </dt>
                <dd className="text-surface-600 leading-relaxed">{t.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      {/* Footer CTA */}
      <div className="mt-12 p-8 rounded-2xl bg-brand-50 border border-brand-100 text-center">
        <p className="text-lg font-semibold text-surface-900 mb-2">
          Nevíš, kde začít?
        </p>
        <p className="text-surface-600 mb-6">
          Otestuj svou AI úroveň a dostaneš doporučení přesně pro tebe.
        </p>
        <a
          href="/test-urovne"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
        >
          <span>🎯</span>
          <span>Zjistit svou AI úroveň</span>
        </a>
      </div>
    </div>
  );
}
