/**
 * Site configuration — CZ only (aikompass.cz)
 */

export const site = {
  locale:        "cs",
  domain:        "aikompass.cz",
  url:           "https://aikompass.cz",
  name:          "AI Kompass",
  tagline:       "Jen 5 AI nástrojů které opravdu potřebuješ",
  description:   "Testujeme AI nástroje za tebe. Poctivé recenze v češtině, ceny v Kč, GDPR info.",
  twitterHandle: "@aikompass",
  contentDir:    "cz",
} as const;

export const nav = {
  links: [
    { label: "Recenze",      href: "/kategorie/recenze" },
    { label: "Srovnání",     href: "/kategorie/srovnani" },
    { label: "Návody",       href: "/kategorie/navody" },
    { label: "Začínám s AI", href: "/kategorie/zacatky" },
    { label: "Slovník",      href: "/slovnik" },
    { label: "📡 AI Radar",  href: "/radar" },
    { label: "O nás",        href: "/o-nas" },
  ],
} as const;

export const ui = {
  readMore:    "Číst více",
  publishedOn: "Publikováno",
  updatedOn:   "Aktualizováno",
  minRead:     "min čtení",
  tryFree:     "Vyzkoušet zdarma",
  visitSite:   "Navštívit web",
  rating:      "Hodnocení",
  price:       "Cena",
  bestFor:     "Nejlepší pro",
  pros:        "Výhody",
  cons:        "Nevýhody",
  faq:         "Časté dotazy",
  disclaimer:  "Tento článek obsahuje affiliate linky. Při nákupu přes náš odkaz dostaneme provizi — pro vás za stejnou cenu.",
} as const;
