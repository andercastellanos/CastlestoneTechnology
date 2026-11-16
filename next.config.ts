import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /about used to render a duplicate of /company/about.
      { source: "/about", destination: "/company/about", permanent: true },
    ];
  },
};

export default nextConfig;
