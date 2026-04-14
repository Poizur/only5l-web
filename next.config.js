/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  env: {
    SITE: process.env.NEXT_PUBLIC_SITE === "com" ? "com" : "cz",
  },
  generateBuildId: async () => "build-202604140506",
};

module.exports = nextConfig;
