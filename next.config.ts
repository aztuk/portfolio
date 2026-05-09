import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async redirects() {
    const domain = process.env.NEXT_PUBLIC_SITE_URL;
    if (!domain) return [];
    const hostname = new URL(domain).hostname;
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${hostname}` }],
        destination: `${domain}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
