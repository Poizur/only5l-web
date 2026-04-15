import { NextResponse } from "next/server";
import { AI_TOOLS } from "@/lib/tools";
import { AFFILIATE_LINKS } from "@/lib/affiliate-links";

const RAILWAY_URL =
  process.env.NEXT_PUBLIC_RAILWAY_URL ??
  "https://web-production-fc03c.up.railway.app";

/**
 * GET /track/affiliate/[tool]
 *
 * 1. Najde cílovou URL nástroje v AI_TOOLS nebo AFFILIATE_LINKS
 * 2. Asynchronně zaznamená klik na Railway (fire-and-forget)
 * 3. Okamžitě přesměruje uživatele na cílovou URL
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ tool: string }> }
) {
  const { tool } = await params;

  // Najdi cílovou URL — nejdřív AI_TOOLS, pak AFFILIATE_LINKS
  const toolData = AI_TOOLS.find((t) => t.id === tool);
  const destination: string =
    toolData?.affiliateUrl ??
    (AFFILIATE_LINKS as Record<string, string>)[tool] ??
    "/nastroje";

  // Fire-and-forget tracking — neblokuje redirect
  fetch(`${RAILWAY_URL}/affiliate/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tool,
      referrer: request.headers.get("referer") ?? "",
      user_agent: request.headers.get("user-agent") ?? "",
    }),
  }).catch(() => {
    // Ignoruj chyby — tracking nesmí rozbít affiliate odkaz
  });

  return NextResponse.redirect(destination, {
    status: 302,
    headers: {
      // Zabrání cachování — každý klik musí projít trackingem
      "Cache-Control": "no-store",
    },
  });
}
