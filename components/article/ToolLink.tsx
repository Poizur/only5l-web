import React, { ReactNode } from "react";
import { AI_TOOLS } from "@/lib/tools";

interface ToolLinkProps {
  /** Tool id matching lib/tools.ts AI_TOOLS.id (e.g. "chatgpt", "claude") */
  slug: string;
  /** Optional path suffix after /track/affiliate/{slug} (e.g. "/plans" for plan-specific) */
  path?: string;
  children: ReactNode;
}

/**
 * In-article link to an AI tool through the tracking redirect.
 * Generates: <a href="/track/affiliate/{slug}{path}" target="_blank" rel="...sponsored">
 *
 * The /track/affiliate/[tool] route falls back gracefully for unknown slugs
 * (AI_TOOLS.affiliateUrl → AFFILIATE_LINKS map → /nastroje redirect), so a
 * typo in slug results in a redirect to the tools listing, not a broken link.
 *
 * RSC-safe: only string props (no arrays, no numbers) — past #11 of CLAUDE.md.
 */
export default function ToolLink({ slug, path, children }: ToolLinkProps) {
  const isKnown = AI_TOOLS.some((t) => t.id === slug);

  if (!isKnown && process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.warn(
      `[ToolLink] Unknown slug "${slug}". Add it to lib/tools.ts AI_TOOLS or fix the MDX.`,
    );
  }

  const href = `/track/affiliate/${slug}${path ?? ""}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className="text-brand-600 font-medium hover:underline"
    >
      {children}
    </a>
  );
}
