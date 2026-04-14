/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  env: {
    SITE: process.env.NEXT_PUBLIC_SITE === "com" ? "com" : "cz",
  },
  async redirects() {
    return [
      // 301 redirect: old domain → new domain (preserves path)
      {
        source: "/:path*",
        has: [{ type: "host", value: "only5l.cz" }],
        destination: "https://aikompass.cz/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "only5l.com" }],
        destination: "https://aikompass.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
