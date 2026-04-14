/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  env: {
    SITE: process.env.NEXT_PUBLIC_SITE === "com" ? "com" : "cz",
  },
};

module.exports = nextConfig;
