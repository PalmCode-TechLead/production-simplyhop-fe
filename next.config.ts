import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/google/maps/:path*",
        destination: `${process.env.NEXT_PUBLIC_MAPS_GOOGLE_API_URL}/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
