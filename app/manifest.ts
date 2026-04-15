import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Kompass — Testujeme AI nástroje za tebe",
    short_name: "AI Kompass",
    description: "Poctivé recenze AI nástrojů v češtině. Ceny v Kč, GDPR info, tipy pro začátečníky.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    orientation: "portrait",
    lang: "cs",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/home-mobile.png",
        sizes: "390x844",
        type: "image/png",
        // @ts-expect-error — form_factor is valid but not yet in TS types
        form_factor: "narrow",
        label: "Domovská stránka na mobilu",
      },
    ],
    categories: ["news", "education", "productivity"],
    shortcuts: [
      {
        name: "AI nástroje",
        url: "/nastroje",
        description: "Filtruj a hledej AI nástroje",
      },
      {
        name: "Prompty",
        url: "/prompty",
        description: "Česká knihovna promptů",
      },
      {
        name: "Hledat",
        url: "/hledat",
        description: "Fulltext vyhledávání",
      },
    ],
  };
}
