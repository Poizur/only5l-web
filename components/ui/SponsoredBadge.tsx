/**
 * SponsoredBadge — jasné označení sponzorovaného obsahu
 *
 * Použití:
 *   <SponsoredBadge partner="Editee" />
 *   <SponsoredBadge partner="Everbot" variant="inline" />
 *
 * Komponenta je připravena k aktivaci jakmile budou podepsány sponzorské smlouvy.
 * Zobrazuje se vždy viditelně, v souladu s GDPR a ASZ (zákon o reklamě).
 */

interface SponsoredBadgeProps {
  /** Jméno sponzora zobrazené uživateli */
  partner: string;
  /** "block" = výrazný banner (top of section), "inline" = malý tag vedle nadpisu */
  variant?: "block" | "inline";
  /** Volitelný odkaz na sponzora */
  href?: string;
}

export function SponsoredBadge({
  partner,
  variant = "inline",
  href,
}: SponsoredBadgeProps) {
  const label = `Sponzorováno · ${partner}`;

  if (variant === "block") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800 w-fit">
        <svg
          className="w-4 h-4 text-amber-600 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-medium">{label}</span>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-amber-600 hover:text-amber-700 underline text-xs"
          >
            Více info
          </a>
        )}
      </div>
    );
  }

  // inline variant
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-amber-50 border border-amber-200 text-amber-700 rounded"
      title="Tento obsah byl sponzorován. Naše hodnocení je vždy nezávislé."
    >
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {label}
    </span>
  );
}

/**
 * SponsoredSection — wrapper pro sponzorovanou sekci stránky.
 * Obalí obsah vizuálním rámečkem a přidá badge nahoře.
 */
export function SponsoredSection({
  partner,
  href,
  children,
}: {
  partner: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-5">
      <div className="mb-3">
        <SponsoredBadge partner={partner} variant="block" href={href} />
      </div>
      {children}
    </section>
  );
}
