/**
 * Centrální soubor affiliate odkazů.
 * Chceš změnit URL nástroje? Stačí upravit tento soubor — projeví se všude.
 *
 * TRACKING: Affiliate kliknutí jsou trackovány přes /track/affiliate/[tool].
 * Místo přímých URL použi vždy tracking wrapper:
 *   href="/track/affiliate/chatgpt"   ← správně
 *   href="https://chat.openai.com"    ← špatně (nezaznamenává kliknutí)
 */
export const AFFILIATE_LINKS = {
  chatgpt:          "https://chat.openai.com",
  claude:           "https://claude.ai",
  gemini:           "https://gemini.google.com",
  perplexity:       "https://www.perplexity.ai",
  github_copilot:   "https://github.com/features/copilot",
  copilot:          "https://copilot.microsoft.com",
  midjourney:       "https://midjourney.com",
  jasper:           "https://www.jasper.ai",
  copyai:           "https://copy.ai",
  writesonic:       "https://writesonic.com",
  grammarly:        "https://grammarly.com",
  deepl:            "https://deepl.com",
  superhuman:       "https://superhuman.com",
  lavender:         "https://lavender.ai",
  cursor:           "https://www.cursor.com",
  dalle3:           "https://chat.openai.com",
  adobefirefly:     "https://www.adobe.com/products/firefly.html",
  canva:            "https://www.canva.com",
  leonardoai:       "https://leonardo.ai",
  ideogram:         "https://ideogram.ai",
  runway:           "https://runwayml.com",
  heygen:           "https://www.heygen.com",
  synthesia:        "https://www.synthesia.io",
  pika:             "https://pika.art",
  codeium:          "https://codeium.com",
  tabnine:          "https://www.tabnine.com",
  v0:               "https://v0.dev",
  surferseo:        "https://surferseo.com",
  frase:            "https://www.frase.io",
  seowind:          "https://seowind.io",
  "semrush-ai":     "https://www.semrush.com/seo-writing-assistant/",
  notionai:         "https://www.notion.so/product/ai",
  make:             "https://www.make.com",
  zapier:           "https://zapier.com",
  otter:            "https://otter.ai",
  elevenlabs:       "https://elevenlabs.io",
  microsoftcopilot: "https://copilot.microsoft.com",
} as const;

export type AffiliateTool = keyof typeof AFFILIATE_LINKS;

/**
 * SPONZOROVANÉ SEKCE
 * ─────────────────────────────────────────────────────────────────────────────
 * České AI firmy které mohou sponzorovat sekce nebo newslettery.
 * Obsah je připraven k aktivaci — stačí doplnit affiliate/sponzorský odkaz.
 *
 * DŮLEŽITÉ: Každý sponzorovaný obsah MUSÍ být označen pomocí <SponsoredBadge>
 * nebo <SponsoredSection> z components/ui/SponsoredBadge.tsx.
 * Zákonná povinnost dle §2 odst. 1 písm. b) zákona č. 40/1995 Sb.
 */
export const SPONSORED = {
  /**
   * Editee — česká AI platforma pro generování obsahu
   * Status: PŘIPRAVENO — čeká na podpis smlouvy
   */
  editee: {
    name:         "Editee",
    tagline:      "Česká AI platforma pro tvorbu obsahu",
    websiteUrl:   "https://editee.com",
    affiliateUrl: null as string | null, // ← doplnit po podpisu smlouvy
    active:       false,                 // ← změnit na true po aktivaci
    badgeLabel:   "Editee",
  },

  /**
   * Everbot — český AI chatbot pro e-commerce
   * Status: PŘIPRAVENO — čeká na podpis smlouvy
   */
  everbot: {
    name:         "Everbot",
    tagline:      "AI chatbot pro český e-commerce",
    websiteUrl:   "https://everbot.cz",
    affiliateUrl: null as string | null, // ← doplnit po podpisu smlouvy
    active:       false,                 // ← změnit na true po aktivaci
    badgeLabel:   "Everbot",
  },
} as const;

export type SponsoredPartner = keyof typeof SPONSORED;

/**
 * Vrátí tracking URL pro nástroj.
 * Vždy používej tuto funkci místo přímých odkazů.
 *
 * @example
 *   href={trackingUrl("chatgpt")}  →  "/track/affiliate/chatgpt"
 */
export function trackingUrl(toolId: string): string {
  return `/track/affiliate/${toolId}`;
}
