/**
 * AI Kompass logo — compass needle icon + wordmark.
 * Use <Logo /> anywhere; wrap in <Link href="/"> at call site.
 */

interface LogoProps {
  /** Scale the icon + text. Default: "md" */
  size?: "sm" | "md" | "lg";
  /** Hide the wordmark (icon only) */
  iconOnly?: boolean;
  className?: string;
}

export default function Logo({ size = "md", iconOnly = false, className = "" }: LogoProps) {
  const dims = { sm: 22, md: 28, lg: 36 }[size];
  const textSize = { sm: "text-sm", md: "text-lg", lg: "text-2xl" }[size];

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <CompassIcon size={dims} />
      {!iconOnly && (
        <span className={`font-semibold tracking-tight leading-none ${textSize}`}>
          <span className="text-brand-600">AI</span>
          <span className="text-surface-900 dark:text-white"> Kompass</span>
        </span>
      )}
    </span>
  );
}

function CompassIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="14" cy="14" r="12.5" stroke="#1d4ed8" strokeWidth="1.5" strokeOpacity="0.2" />

      {/* Cardinal ticks — E and W */}
      <line x1="26"  y1="14" x2="24.5" y2="14" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35" />
      <line x1="2"   y1="14" x2="3.5"  y2="14" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.35" />

      {/* North needle — dark brand blue */}
      <path d="M14 2.5 L17.5 14 L14 12 L10.5 14 Z" fill="#1d4ed8" />

      {/* South needle — light blue */}
      <path d="M14 25.5 L17.5 14 L14 16 L10.5 14 Z" fill="#93c5fd" />

      {/* Center pivot */}
      <circle cx="14" cy="14" r="2.5" fill="white" />
      <circle cx="14" cy="14" r="1.4" fill="#1d4ed8" />
    </svg>
  );
}
