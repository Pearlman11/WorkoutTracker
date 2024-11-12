import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  remotePatterns: [
    {
       hostname: '**',
    },
  ]
};

export default nextConfig;
