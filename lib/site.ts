/**
 * Site configuration — switches between aikompass.cz (cs) and aikompass.com (en)
 * based on NEXT_PUBLIC_SITE env variable set in Vercel project settings.
 */

const SITE = process.env.NEXT_PUBLIC_SITE ?? "cz";

export const isCZ = SITE === "cz";
export const isEN = SITE === "com";

export const site = {
  locale:      isCZ ? "cs" : "en",
  domain:      isCZ ? "aikompass.cz" : "aikompass.com",
  url:         isCZ ? "https://aikompass.cz" : "https://aikompass.com",
  name:        "AI Kompass",
  tagline:     isCZ
    ? "Jen 5 AI nástrojů které opravdu potřebuješ"
    : "Only 5 AI tools you actually need",
  description: isCZ
    ? "Testujeme AI nástroje za tebe. Poctivé recenze v češtině, ceny v Kč, GDPR info."
    : "Honest AI tool reviews. Real testing, real prices, no fluff.",
  twitterHandle: "@aikompass",
  contentDir:  isCZ ? "cz" : "en",
} as const;

export const nav = {
  links: isCZ
    ? [
        { label: "Recenze",   href: "/kategorie/recenze" },
        { label: "Srovnání",  href: "/kategorie/srovnani" },
        { label: "Návody",    href: "/kategorie/navody" },
        { label: "O nás",     href: "/o-nas" },
      ]
    : [
        { label: "Reviews",   href: "/category/reviews" },
        { label: "Comparisons", href: "/category/comparisons" },
        { label: "Guides",    href: "/category/guides" },
        { label: "About",     href: "/about" },
      ],
} as const;

export const ui = {
  readMore:    isCZ ? "Číst více" : "Read more",
  publishedOn: isCZ ? "Publikováno" : "Published",
  updatedOn:   isCZ ? "Aktualizováno" : "Updated",
  minRead:     isCZ ? "min čtení" : "min read",
  tryFree:     isCZ ? "Vyzkoušet zdarma" : "Try for free",
  visitSite:   isCZ ? "Navštívit web" : "Visit website",
  rating:      isCZ ? "Hodnocení" : "Rating",
  price:       isCZ ? "Cena" : "Price",
  bestFor:     isCZ ? "Nejlepší pro" : "Best for",
  pros:        isCZ ? "Výhody" : "Pros",
  cons:        isCZ ? "Nevýhody" : "Cons",
  faq:         isCZ ? "Časté dotazy" : "FAQ",
  disclaimer:  isCZ
    ? "Tento článek obsahuje affiliate linky. Při nákupu přes náš odkaz dostaneme provizi — pro vás za stejnou cenu."
    : "This article contains affiliate links. We may earn a commission at no extra cost to you.",
} as const;
