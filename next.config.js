/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Each deployment is one locale — set via NEXT_PUBLIC_SITE env var
  env: {
    SITE: process.env.NEXT_PUBLIC_SITE || "cz", // "cz" or "com"
  },
};

module.exports = nextConfig;
