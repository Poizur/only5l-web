import { ui } from "@/lib/site";

interface ToolCardProps {
  name: string;
  tagline: string;
  rating?: number;       // 0-10, optional to survive undefined MDX props
  price: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  affiliateLabel?: string;
  logoUrl?: string;
}

function RatingBar({ value }: { value: number }) {
  const safeValue = typeof value === "number" ? value : 0;
  const pct = (safeValue / 10) * 100;
  const color =
    safeValue >= 8 ? "bg-emerald-500" : safeValue >= 6 ? "bg-brand-500" : "bg-amber-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-surface-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-bold text-surface-700 w-8 text-right">{safeValue.toFixed(1)}</span>
    </div>
  );
}

export default function ToolCard({
  name,
  tagline,
  rating,
  price,
  bestFor,
  pros,
  cons,
  affiliateUrl,
  affiliateLabel,
  logoUrl,
}: ToolCardProps) {
  const safeRating = typeof rating === "number" ? rating : 0;
  const scoreColor =
    safeRating >= 8
      ? "bg-emerald-500 text-white"
      : safeRating >= 6
      ? "bg-brand-600 text-white"
      : "bg-amber-500 text-white";

  return (
    <div className="rounded-2xl border border-surface-200 bg-surface-0 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4 p-6 border-b border-surface-100">
        {logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoUrl} alt={name} className="w-12 h-12 rounded-xl object-contain bg-surface-50 border border-surface-100 p-1 shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-surface-900">{name}</h3>
          <p className="text-surface-500 text-sm mt-0.5 leading-snug">{tagline}</p>
        </div>
        <div className={`score-badge text-lg font-extrabold shrink-0 ${scoreColor}`}>
          {safeRating.toFixed(1)}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 divide-x divide-surface-100 border-b border-surface-100">
        <div className="px-5 py-3">
          <p className="text-xs text-surface-400 font-medium uppercase tracking-wide mb-0.5">{ui.price}</p>
          <p className="text-sm font-semibold text-surface-800">{price}</p>
        </div>
        <div className="px-5 py-3">
          <p className="text-xs text-surface-400 font-medium uppercase tracking-wide mb-0.5">{ui.bestFor}</p>
          <p className="text-sm font-semibold text-surface-800">{bestFor}</p>
        </div>
      </div>

      {/* Pros / Cons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-surface-100 border-b border-surface-100">
        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-2">{ui.pros}</p>
          <ul className="space-y-1.5">
            {pros.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-surface-700">
                <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">{ui.cons}</p>
          <ul className="space-y-1.5">
            {cons.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-surface-700">
                <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Rating bar */}
      <div className="px-5 py-4 border-b border-surface-100">
        <p className="text-xs text-surface-400 font-medium uppercase tracking-wide mb-2">{ui.rating}</p>
        <RatingBar value={safeRating} />
      </div>

      {/* CTA */}
      <div className="p-5">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="affiliate-btn w-full justify-center"
        >
          {affiliateLabel ?? ui.tryFree} →
        </a>
      </div>
    </div>
  );
}
