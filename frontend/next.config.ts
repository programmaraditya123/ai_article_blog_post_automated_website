import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  sassOptions: {
    additionalData: `$var: red;`,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
