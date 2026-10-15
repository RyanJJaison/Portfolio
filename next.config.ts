import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/lab", destination: "/now", permanent: true }];
  },
};

export default nextConfig;
