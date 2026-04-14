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
    ];
  },
};

module.exports = nextConfig;
