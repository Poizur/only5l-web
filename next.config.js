/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  env: {
    SITE: "cz",
  },
  async rewrites() {
    // Proxy /admin/* backend admin UI/APIs from FastAPI on Railway, so
    // aikompass.cz serves as single-origin for PWA + bookmarkability.
    // Source-path rewrites (unlike redirects) keep URL in browser as
    // aikompass.cz while Vercel fetches Railway server-side.
    const RAILWAY = "https://web-production-fc03c.up.railway.app";
    return [
      // Morning dashboard (proactive queue management UI)
      { source: "/admin/morning",                destination: `${RAILWAY}/admin/morning` },
      { source: "/admin/morning/:path*",         destination: `${RAILWAY}/admin/morning/:path*` },
      // Comprehensive admin dashboard (6 sections, token-guarded)
      { source: "/admin/dashboard",              destination: `${RAILWAY}/admin/dashboard` },
      { source: "/admin/dashboard/:path*",       destination: `${RAILWAY}/admin/dashboard/:path*` },
      // Pillar / curator admin views + actions
      { source: "/admin/pillar-dashboard",       destination: `${RAILWAY}/admin/pillar-dashboard` },
      { source: "/admin/topics",                 destination: `${RAILWAY}/admin/topics` },
      { source: "/admin/topics/:path*",          destination: `${RAILWAY}/admin/topics/:path*` },
      { source: "/admin/source-bundles/:path*",  destination: `${RAILWAY}/admin/source-bundles/:path*` },
      { source: "/admin/curator-write/:path*",   destination: `${RAILWAY}/admin/curator-write/:path*` },
      { source: "/admin/curator-publish/:path*", destination: `${RAILWAY}/admin/curator-publish/:path*` },
      { source: "/admin/pillar-write/:path*",    destination: `${RAILWAY}/admin/pillar-write/:path*` },
      { source: "/admin/pillar-publish/:path*",  destination: `${RAILWAY}/admin/pillar-publish/:path*` },
      { source: "/admin/pillar-write-v2/:path*", destination: `${RAILWAY}/admin/pillar-write-v2/:path*` },
      // Diagnostic endpoints
      { source: "/admin/agent-decisions",        destination: `${RAILWAY}/admin/agent-decisions` },
      { source: "/admin/error-log",              destination: `${RAILWAY}/admin/error-log` },
      { source: "/admin/qr-diagnose",            destination: `${RAILWAY}/admin/qr-diagnose` },
    ];
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "only5l.cz" }],
        destination: "https://aikompass.cz/:path*",
        permanent: true,
      },
      {
        source: "/nejlep-prompty-pro-chatgpt",
        destination: "/nejlepsi-prompty-pro-chatgpt",
        permanent: true,
      },
      {
        source: "/insightfinder-raises-15m-to-help-companies-figure-out-where-ai-agents-go-wrong-i",
        destination: "/insightfinder-raises-15m-to-help-companies-figure-out-where-ai-agents-go-wrong",
        permanent: true,
      },
      {
        source: "/meta-raises-quest-3-and-quest-3s-prices-due-to-ram-shortage-meta-zvysuje-ceny-qu",
        destination: "/meta-raises-quest-3-and-quest-3s-prices-due-to-ram-shortage",
        permanent: true,
      },
      {
        source: "/jak-zacit-pouzivat-chatgpt-navod-pro-zacatecniky-2026",
        destination: "/jak-zacit-s-chatgpt-navod-pro-uplne-zacatecniky-2026",
        permanent: true,
      },
      {
        source: "/jak-pouzivat-gemini-google-spusten-gemini-3-1-flash-tts-preview-model",
        destination: "/google-spousti-gemini-3-1-flash-tts-preview-2026",
        permanent: true,
      },
      {
        source: "/jak-zacit-s-chatgpt-nove-integrace-chatgpt-se-slack-konektor-a-aplikace",
        destination: "/openai-chatgpt-slack-integrace-2026",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
