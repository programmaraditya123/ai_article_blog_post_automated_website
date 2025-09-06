import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions:{
    additonalData:`$var:red;`
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
