/**
 * Prompt knihovna — aikompass.cz
 * Sbírka nejlepších českých promptů rozdělená do kategorií
 */

export type PromptCategory =
  | "psani"
  | "programovani"
  | "marketing"
  | "analyza"
  | "preklad";

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  /** Pro které nástroje prompt funguje nejlépe */
  bestFor: string[];
  /** Vlastní text promptu — kopírovatelný */
  prompt: string;
  /** Tipy pro použití */
  tips?: string[];
  difficulty: "začátečník" | "pokročilý" | "expert";
}

export const PROMPT_CATEGORY_LABELS: Record<PromptCategory, { label: string; icon: string }> = {
  psani:         { label: "Psaní",        icon: "✍️" },
  programovani:  { label: "Programování", icon: "💻" },
  marketing:     { label: "Marketing",    icon: "📣" },
  analyza:       { label: "Analýza",      icon: "📊" },
  preklad:       { label: "Překlad",      icon: "🌍" },
};

export const PROMPTS: Prompt[] = [
  // ── PSANÍ ──────────────────────────────────────────────────────────────
  {
    id: "blog-clanek-osnova",
    title: "Osnova blog článku",
    description: "Vytvoří detailní osnovu SEO optimalizovaného článku s H2 a H3 sekcemi.",
    category: "psani",
    bestFor: ["ChatGPT", "Claude"],
    difficulty: "začátečník",
    prompt: `Vytvoř detailní osnovu blog článku na téma: [TÉMA]

Cílová skupina: [POPIS PUBLIKA, např. "začínající freelanceři v ČR"]
Cíl článku: [CÍL, např. "přesvědčit čtenáře k vyzkoušení nástroje X"]
Délka článku: přibližně 2000 slov

Osnova musí obsahovat:
- Poutavý nadpis (H1) s hlavním klíčovým slovem
- Úvod (proč čtenář musí číst dál)
- 5-7 hlavních sekcí (H2) s podnadpisy (H3)
- Praktické příklady nebo tipy v každé sekci
- Závěr s CTA (výzvou k akci)
- Meta popis (max 160 znaků)

Formát: Markdown se stručnými poznámkami k obsahu každé sekce.`,
    tips: [
      "Doplň konkrétní klíčové slovo pro lepší SEO relevanci",
      "Upřesni cílové publikum co nejkonkrétněji",
    ],
  },
  {
    id: "email-profesionalni",
    title: "Profesionální email",
    description: "Napíše profesionální obchodní email v češtině s jasnou strukturou a výzvou k akci.",
    category: "psani",
    bestFor: ["ChatGPT", "Claude", "Gemini"],
    difficulty: "začátečník",
    prompt: `Napiš profesionální email v češtině.

Odesílatel: [MÉ JMÉNO a POZICE]
Příjemce: [JMÉNO a POZICE příjemce]
Téma emailu: [O ČEM JE EMAIL]
Tón: [formální / přátelský / naléhavý]
Výzva k akci: [CO MÁ PŘÍJEMCE UDĚLAT]
Kontext: [DŮLEŽITÉ INFORMACE K SITUACI]

Požadavky:
- Délka: 150-250 slov
- Strukturovaný odstavci
- Jasná výzva k akci v závěru
- Žádné klišé frázemi jako "v příloze zasílám"
- Podpis s kontakty`,
    tips: [
      "Pro formální korespondenci přidej 'Pokud píšeš poprvé, zmiň jak jsi na kontakt přišel'",
    ],
  },
  {
    id: "obsah-ze-strucnych-poznamek",
    title: "Článek z poznámek",
    description: "Rozepíše stručné bullet points do plnohodnotného čtivého článku.",
    category: "psani",
    bestFor: ["Claude", "ChatGPT"],
    difficulty: "začátečník",
    prompt: `Rozpiš tyto stručné poznámky do plnohodnotného článku v češtině.

POZNÁMKY:
[VLOŽ BULLET POINTS NEBO STRUČNÉ BODY]

Instrukce:
- Styl: [informační / konverzační / odborný]
- Cílová délka: [X slov]
- Zachovej všechny faktické informace z poznámek
- Přidej plynulé přechody mezi odstavci
- Začni poutavým úvodem, ne "V tomto článku se dozvíte"
- Konec shrnutím nebo výzvou k akci

Nepřidávej informace, které v poznámkách nejsou, pokud je jasně neinstruuji.`,
    tips: [
      "Čím detailnější poznámky, tím kvalitnější výstup",
      "Uveď zdroje v poznámkách pokud chceš, aby je Claude zmínil",
    ],
  },
  {
    id: "recenze-produkt",
    title: "Recenze produktu/nástroje",
    description: "Napíše vyváženou recenzi s výhodami, nevýhodami a hodnocením.",
    category: "psani",
    bestFor: ["ChatGPT", "Claude"],
    difficulty: "pokročilý",
    prompt: `Napiš vyváženou recenzi produktu/nástroje v češtině.

Produkt: [NÁZEV]
Moje zkušenost: [KRÁTKÝ POPIS MÉ ZKUŠENOSTI — jak dlouho, k čemu jsem používal]
Cílová skupina recenze: [KDO BUDE ČÍST]

Struktura recenze:
1. Úvod — co to je a pro koho
2. Klíčové funkce (3-5 bullet points)
3. Výhody (Pros) — min 4 body
4. Nevýhody (Cons) — min 3 body (buď upřímný!)
5. Komu to doporučím a komu ne
6. Celkové hodnocení [X/10] s odůvodněním

Tón: upřímný, bez přehnaného nadšení. Čtenář si z toho musí udělat vlastní obrázek.`,
  },
  {
    id: "poutavy-titulek",
    title: "10 variant titulků",
    description: "Vygeneruje 10 různých variant titulků článku s různými strategiemi.",
    category: "psani",
    bestFor: ["ChatGPT", "Claude", "Gemini"],
    difficulty: "začátečník",
    prompt: `Vygeneruj 10 různých variant titulků pro tento obsah:

Téma/obsah článku: [STRUČNÝ POPIS]
Hlavní klíčové slovo: [KW]
Cílové publikum: [KDO BUDE ČÍST]

Vytvoř titulky v těchto stylech:
1. Přímý a informační ("Jak...")
2. Číselný seznam ("7 způsobů...")
3. Otázka ("Proč..?" nebo "Jaký je...")
4. Problém-řešení ("Máš... Tohle pomůže")
5. Tajemství/zvědavost
6. Srovnání ("X vs Y")
7. Upřímný/kontrariánský
8. Urgentní
9. Výsledkový ("Za 30 dní...")
10. Sociální důkaz ("Jak X lidí...")

Pro každý titulek maximálně 70 znaků. Zvýrazni 3 nejsilnější tučně.`,
  },

  // ── PROGRAMOVÁNÍ ──────────────────────────────────────────────────────────
  {
    id: "code-review",
    title: "Code review a refaktoring",
    description: "Provede code review s konkrétními návrhy na zlepšení čitelnosti a výkonu.",
    category: "programovani",
    bestFor: ["Claude", "GitHub Copilot", "Cursor"],
    difficulty: "pokročilý",
    prompt: `Proveď code review níže uvedeného kódu.

KODE:
\`\`\`[JAZYK]
[VLOŽ KÓD]
\`\`\`

Kontext: [K ČEMU TENTO KÓD SLOUŽÍ]

Zkontroluj a okomentuj:
1. Čitelnost a pojmenování proměnných/funkcí
2. Potenciální bugy nebo edge cases
3. Výkonnostní problémy (pokud jsou)
4. Bezpečnostní rizika (pokud jsou)
5. Chybějící error handling
6. Možnosti refaktoringu (DRY, SOLID principy)

Na závěr: navrhni konkrétní refaktorovanou verzi nejvíce problematické části.
Hodnoť na škále: 🟢 OK / 🟡 Zlepšit / 🔴 Problém.`,
    tips: [
      "Pro lepší kontext přidej, jaký framework/knihovny používáš",
      "Zmiň, zda je kód v produkci nebo ve vývoji",
    ],
  },
  {
    id: "debugovani",
    title: "Debugování chyby",
    description: "Systematicky diagnostikuje chybu, vysvětlí příčinu a navrhne fix.",
    category: "programovani",
    bestFor: ["Claude", "ChatGPT", "Cursor"],
    difficulty: "začátečník",
    prompt: `Pomoz mi debugovat tuto chybu.

CHYBOVÁ HLÁŠKA:
\`\`\`
[VLOŽ CELOU CHYBU / STACK TRACE]
\`\`\`

KODE kde chyba vzniká:
\`\`\`[JAZYK]
[RELEVANTNÍ ČÁST KÓDU]
\`\`\`

Kontext:
- Jazyk/framework: [NAPŘ. Python 3.11 / Next.js 15 / Django]
- Kdy chyba nastane: [POPIS KROKŮ K REPRODUKCI]
- Co jsem již zkoušel: [CO NEFUNGOVALO]

Potřebuji:
1. Vysvětlení co chyba znamená (jednoduše)
2. Příčina chyby v mém kódu
3. Konkrétní fix s ukázkou kódu
4. Jak chybě předejít v budoucnu`,
  },
  {
    id: "dokumentace-funkce",
    title: "Dokumentace kódu",
    description: "Napíše docstrings, komentáře a README sekci pro zadaný kód.",
    category: "programovani",
    bestFor: ["GitHub Copilot", "Claude", "Cursor"],
    difficulty: "začátečník",
    prompt: `Napiš kompletní dokumentaci pro tento kód.

KODE:
\`\`\`[JAZYK]
[VLOŽ KÓD]
\`\`\`

Vytvoř:
1. Docstring/JSDoc pro každou funkci/třídu (parametry, return hodnoty, příklady)
2. Inline komentáře pro nepřímočaré části kódu
3. README sekci (Markdown) s:
   - Co kód dělá (2-3 věty)
   - Jak nainstalovat/použít
   - Příklad použití
   - Závislosti

Styl dokumentace: [např. Google style / NumPy / JSDoc]
Jazyk dokumentace: čeština`,
  },
  {
    id: "unit-testy",
    title: "Generování unit testů",
    description: "Vygeneruje kompletní sadu unit testů pokrývající edge cases.",
    category: "programovani",
    bestFor: ["Claude", "GitHub Copilot", "Cursor"],
    difficulty: "pokročilý",
    prompt: `Napiš unit testy pro tuto funkci/třídu.

KODE K OTESTOVÁNÍ:
\`\`\`[JAZYK]
[VLOŽ KÓD]
\`\`\`

Testing framework: [pytest / Jest / Vitest / JUnit / ...]
Styl: [unit testy / integrační testy]

Pokryj tyto scénáře:
1. Happy path (standardní vstup → správný výstup)
2. Edge cases (prázdný vstup, null, nula, maximální hodnoty)
3. Chybové stavy (co se stane při špatném vstupu)
4. Hraniční hodnoty

Každý test musí mít:
- Jasný název (popisující co testuje)
- Arrange-Act-Assert strukturu
- Komentář proč je test důležitý (pro neobvyklé cases)`,
  },

  // ── MARKETING ─────────────────────────────────────────────────────────────
  {
    id: "socialni-site-posty",
    title: "Posty pro sociální sítě",
    description: "Vygeneruje sadu postů pro různé platformy z jednoho tématu.",
    category: "marketing",
    bestFor: ["ChatGPT", "Claude", "Jasper"],
    difficulty: "začátečník",
    prompt: `Vytvoř sadu social media postů pro tyto platformy.

Téma/obsah: [O ČEM JE POST]
Tón značky: [formální / přátelský / odborný / vtipný]
CTA (výzva k akci): [CO MÁ ČTENÁŘ UDĚLAT]
URL odkaz: [POKUD EXISTUJE]

Vytvoř posty pro:

1. **LinkedIn** (200-300 znaků, profesionální, s hashtagy)
2. **Twitter/X** (max 280 znaků, přímý, hooky na kliknutí)
3. **Instagram caption** (150-200 znaků + 5-8 relevantních hashtagů)
4. **Facebook** (100-150 znaků, konverzační)

Pro každý post: navrhni 2 varianty — jedna informativní, jedna provokativní/otázka.`,
    tips: [
      "Přidej příklady postů které se ti líbí pro inspiraci tónem",
      "Zmiň, zda chceš emoji a kolik",
    ],
  },
  {
    id: "email-marketing-sekvence",
    title: "E-mailová sekvence",
    description: "Navrhne a napíše 5-emailovou welcome sekvenci pro nové odběratele.",
    category: "marketing",
    bestFor: ["Claude", "ChatGPT", "Jasper"],
    difficulty: "expert",
    prompt: `Napiš 5-emailovou welcome sekvenci pro nové odběratele.

Produkt/služba: [CO PRODÁVÁŠ]
Cílová skupina: [KDO JSOU TVOJI ZÁKAZNÍCI]
Hlavní problém zákazníka: [JAKÝ PROBLÉM ŘEŠÍ TVŮJ PRODUKT]
Tón komunikace: [formální / přátelský / odborný]
CTA (cíl sekvence): [KAM CHCEŠ ZÁKAZNÍKA DOVÉST — demo, nákup, webinář...]

Struktura každého emailu:
- Předmět (max 50 znaků) + preheader (max 90 znaků)
- Kdy se pošle (den 1, den 3, ...)
- Obsah (200-350 slov)
- CTA tlačítko

Email 1: Uvítání a slib hodnoty
Email 2: Vzdělání (vyřeš jeden problém)
Email 3: Social proof (příběh zákazníka)
Email 4: Překonání hlavní námitky
Email 5: Nabídka s urgencí`,
  },
  {
    id: "usp-value-proposition",
    title: "Unique Value Proposition",
    description: "Vytvoří jasné USP a hodnotovou propozici pro produkt nebo firmu.",
    category: "marketing",
    bestFor: ["Claude", "ChatGPT"],
    difficulty: "pokročilý",
    prompt: `Pomoz mi formulovat Unique Value Proposition (USP) pro můj produkt/firmu.

Produkt/firma: [NÁZEV A KRÁTKÝ POPIS]
Co děláme: [CO PRODUKT/SLUŽBA DĚLÁ]
Pro koho: [CÍLOVÁ SKUPINA — co nejkonkrétněji]
Hlavní problém zákazníka: [BOLEST ZÁKAZNÍKA]
Jak ho řešíme lépe než konkurence: [DIFERENCIÁTOR]
Klíčové výsledky zákazníka: [CO ZÁKAZNÍK ZÍSKÁ]
Konkurenti: [2-3 PŘÍMÍ KONKURENTI]

Vygeneruj:
1. Hlavní USP (1 věta, max 15 slov)
2. Rozvinutá hodnotová propozice (3-4 věty)
3. Elevator pitch (30 sekund, 80-100 slov)
4. Tagline (max 8 slov, zapamatovatelný)
5. 3 varianty hero section headline pro web`,
  },
  {
    id: "landing-page-copy",
    title: "Texty landing page",
    description: "Napíše kompletní copy pro landing page podle konverzní struktury.",
    category: "marketing",
    bestFor: ["Claude", "ChatGPT", "Jasper"],
    difficulty: "expert",
    prompt: `Napiš kompletní texty pro landing page.

Produkt/Služba: [NÁZEV A CO TO DĚLÁ]
Cílová skupina: [KDO TO KUPUJE]
Hlavní problém zákazníka: [BOLEST]
Cena: [PŘIBLIŽNÁ CENA]
Hlavní CTA: [CO MÁ NÁVŠTĚVNÍK UDĚLAT — koupit, registrovat, demo...]

Struktura landing page (vytvoř texty pro každou sekci):

1. **Hero section**: Headline (H1) + subheadline + CTA tlačítko
2. **Social proof bar**: 3-5 log nebo čísla (např. "5000+ zákazníků")
3. **Problém sekce**: Agitace problému (2-3 odstavce)
4. **Řešení sekce**: Jak produkt pomáhá (3 klíčové benefity s ikonami)
5. **Jak to funguje**: 3-4 kroky
6. **Testimonials**: 3 fiktivní recenze (jako placeholder)
7. **FAQ**: 5 nejčastějších otázek s odpověďmi
8. **CTA sekce**: Závěrečná výzva s urgencí

Tón: [formální / přátelský]`,
  },

  // ── ANALÝZA ───────────────────────────────────────────────────────────────
  {
    id: "swot-analyza",
    title: "SWOT analýza",
    description: "Provede hlubokou SWOT analýzu firmy, produktu nebo situace.",
    category: "analyza",
    bestFor: ["Claude", "ChatGPT", "Perplexity"],
    difficulty: "pokročilý",
    prompt: `Proveď detailní SWOT analýzu.

Předmět analýzy: [FIRMA / PRODUKT / PROJEKT / SITUACE]
Kontext: [DŮLEŽITÉ INFORMACE — odvětví, velikost, trh, fáze]
Účel analýzy: [PROČ DĚLÁŠ ANALÝZU — strategické rozhodnutí, investice, launch...]
Perspektiva: [Z JAKÉHO POHLEDU — CEO, investor, zákazník...]

Struktura SWOT:

**Silné stránky (S)**: Min 5 bodů s vysvětlením dopadu
**Slabé stránky (W)**: Min 5 bodů — buď kritický, ne jen povrchní
**Příležitosti (O)**: Min 4 body z trhu/prostředí
**Hrozby (T)**: Min 4 body — realistické rizika

Na závěr:
- Top 3 prioritní akce na základě SWOT
- Klíčový strategický insight (1 odstavec)`,
    tips: [
      "Čím více konkrétních dat a čísel přidáš, tím relevantnější analýza",
      "Přidej 1-2 příklady konkurentů pro srovnání",
    ],
  },
  {
    id: "analyza-dat-tabulka",
    title: "Analýza dat z tabulky",
    description: "Analyzuje data z CSV/tabulky a extrahuje klíčové insights.",
    category: "analyza",
    bestFor: ["Claude", "ChatGPT", "Gemini"],
    difficulty: "pokročilý",
    prompt: `Analyzuj tato data a extrahuj klíčové insights.

DATA (CSV nebo tabulka):
[VLOŽ DATA]

Kontext dat: [CO DATA PŘEDSTAVUJÍ — prodeje, návštěvnost, metriky...]
Časové období: [ROZSAH DAT]
Klíčová otázka: [NA CO CHCEŠ ODPOVĚĎ]

Proveď:
1. **Popis dat**: Základní statistiky (min, max, průměr, trendy)
2. **Anomálie**: Výrazné odchylky od průměru — co je za nimi?
3. **Trendy**: Vzestup/pokles, sezónnost, korelace
4. **Top 3 insights**: Nejdůležitější zjištění (1-2 věty každý)
5. **Doporučení**: 3 konkrétní akce na základě dat
6. **Limitace**: Co data neříkají nebo kde mohla být zkreslena

Výstup: strukturovaný report s bullet pointy, ne žargon.`,
  },
  {
    id: "competitor-analyza",
    title: "Analýza konkurence",
    description: "Porovná konkurenty a najde mezery na trhu a příležitosti.",
    category: "analyza",
    bestFor: ["Perplexity", "Claude", "ChatGPT"],
    difficulty: "expert",
    prompt: `Proveď analýzu konkurence v mém segmentu.

Moje firma/produkt: [POPIS]
Trh/segment: [OBLAST PODNIKÁNÍ]
Geografie: [ČR / EU / global]
Konkurenti k analýze: [UVEĎ 3-5 KONKRÉTNÍCH FIREM]

Pro každého konkurenta zjisti a porovnej:
- Cílová skupina a positioning
- Cenový model a cenové hladiny
- Klíčové funkce / USP
- Slabá místa (negativní recenze, chybějící funkce)
- Marketingová strategie (kanály, tón)

Výstup:
1. Srovnávací tabulka (Markdown)
2. Positioning mapa (textový popis — kde kdo stojí)
3. Mezery na trhu (kde konkurence neplní potřeby zákazníků)
4. Doporučení jak se odlišit

Zdroje: Pokud používáš Perplexity nebo ChatGPT s webem, uveď odkud info pochází.`,
  },
  {
    id: "feedback-analyza",
    title: "Analýza zákaznické zpětné vazby",
    description: "Kategorizuje a analyzuje velké množství recenzí nebo feedbacku.",
    category: "analyza",
    bestFor: ["Claude", "ChatGPT"],
    difficulty: "pokročilý",
    prompt: `Analyzuj tuto zákaznickou zpětnou vazbu a kategorizuj ji.

ZPĚTNÁ VAZBA:
[VLOŽ RECENZE / KOMENTÁŘE / ODPOVĚDI Z PRŮZKUMU]

Zdroj dat: [NAPŘ. App Store recenze / zákaznický průzkum / support tickety]
Počet položek: [PŘIBLIŽNÝ POČET]
Produkt/Služba: [O CO SE JEDNÁ]

Proveď:
1. **Sentiment analýza**: % pozitivní / neutrální / negativní
2. **Kategorizace témat**: Seskup zpětnou vazbu do max 6 témat (tabulka)
3. **Top 3 pochvaly**: Co zákazníci milují nejvíce
4. **Top 3 stížnosti**: Největší frustrace (s citáty)
5. **Skryté potřeby**: Co zákazníci chtějí ale přímo neřekli
6. **Priority pro produkt**: Doporučené akce seřazené dle dopadu

Formát: bullet pointy + přehledná tabulka témat.`,
  },

  // ── PŘEKLAD ───────────────────────────────────────────────────────────────
  {
    id: "preklad-do-cestiny",
    title: "Překlad s lokalizací do češtiny",
    description: "Přeloží text do přirozené češtiny s ohledem na kulturní kontext.",
    category: "preklad",
    bestFor: ["Claude", "ChatGPT", "DeepL"],
    difficulty: "začátečník",
    prompt: `Přelož tento text do přirozené češtiny.

PŮVODNÍ TEXT:
[VLOŽ TEXT K PŘELOŽENÍ]

Instrukce:
- Přeložit do: přirozené hovorové / formální / odborné češtiny [VYBER]
- Zachovej tón originálu (přátelský / odborný / vtipný)
- Lokalizuj kulturní reference pro český kontext (např. americké idiomy → české ekvivalenty)
- Nepoužívej anglicismy kde existuje přirozené české slovo
- Zachovej HTML/Markdown formátování pokud je přítomné
- Speciální termíny ponech anglicky: [SEZNAM TERMÍNŮ NEBO "žádné"]

Po přeložení: uveď 2-3 alternativní varianty pro věty kde byl překlad obtížný.`,
    tips: [
      "Pro technické texty přidej slovník klíčových termínů s preferovaným překladem",
      "Uveď, zda text bude mluvený (TTS) nebo psaný",
    ],
  },
  {
    id: "preklad-pro-seo",
    title: "SEO překlad a lokalizace",
    description: "Přeloží a lokalizuje obsah pro český trh s SEO optimalizací.",
    category: "preklad",
    bestFor: ["Claude", "ChatGPT"],
    difficulty: "pokročilý",
    prompt: `Přelož a lokalizuj tento obsah pro český trh s důrazem na SEO.

PŮVODNÍ TEXT (EN nebo jiný jazyk):
[VLOŽ TEXT]

Cílové klíčové slovo v češtině: [CZ KLÍČOVÉ SLOVO]
Cílová stránka: [TYP — blog článek / produktová stránka / landing page]

Požadavky:
1. Přirozený překlad do češtiny (ne doslovný)
2. Primární klíčové slovo zahrnut v H1 a prvním odstavci
3. Sekundární klíčová slova: [SEZNAM nebo "vygeneruj relevantní"]
4. Meta popis přeložen a optimalizován (max 160 znaků)
5. Kulturní adaptace — přizpůsob příklady, reference, měny (USD → CZK) a data formátu (MM/DD → DD.MM.)
6. Zachovej strukturu nadpisů (H1, H2, H3)

Na konec uveď: co jsi lokalizoval (kulturní reference, měny, termíny).`,
  },
  {
    id: "simultanni-preklad",
    title: "Překlad a shrnutí dokumentu",
    description: "Přeloží dlouhý cizojazyčný dokument a vytvoří stručné shrnutí klíčových bodů.",
    category: "preklad",
    bestFor: ["Claude", "ChatGPT", "Gemini"],
    difficulty: "začátečník",
    prompt: `Přelož tento dokument do češtiny a vytvoř shrnutí.

DOKUMENT:
[VLOŽ TEXT nebo uveď "Soubor přiložen" a nahrál jsi PDF/DOCX]

Jazyk originálu: [EN / DE / FR / ...]
Typ dokumentu: [smlouva / výzkumná studie / technická dokumentace / zpráva / ...]

Výstup:
1. **Shrnutí** (max 200 slov): Klíčové body, závěry, důležitá čísla
2. **Přeložený text**: Kompletní překlad do přirozené češtiny
3. **Glosář**: Tabulka klíčových odborných termínů [EN → CZ] s vysvětlením

U smluv navíc:
- Klíčové povinnosti obou stran
- Důležité lhůty a data
- Potenciálně problematické klauzule (označené ⚠️)`,
    tips: [
      "Pro právní dokumenty výstup slouží jen jako orientační překlad — vždy konzultuj s právníkem",
    ],
  },
  {
    id: "tone-adaptation",
    title: "Adaptace tónu textu",
    description: "Přepíše text do požadovaného tónu — formální, přátelský, odborný nebo persuazivní.",
    category: "preklad",
    bestFor: ["Claude", "ChatGPT"],
    difficulty: "začátečník",
    prompt: `Přepiš tento text do jiného tónu. Obsah zachovej, styl změň.

PŮVODNÍ TEXT:
[VLOŽ TEXT]

SOUČASNÝ TÓN: [popis — např. formální / suchý / technický]
POŽADOVANÝ TÓN: [VYBER]
- Přátelský a konverzační (jako email kamarádovi)
- Profesionální a formální (jako obchodní dopis)
- Odborný a autoritativní (jako expert v oboru)
- Persuazivní a emocionální (jako prodejní copy)
- Stručný a úderný (jako LinkedIn post)
- Empatický a podpůrný (jako zákaznická podpora)

Cílová skupina: [KDO BUDE ČÍST]

Zachovej:
- Všechny faktické informace
- Strukturu (nadpisy, odstavce, seznamy)
- Délku (max ±20%)`,
  },
];
