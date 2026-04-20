/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  env: {
    SITE: "cz",
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
