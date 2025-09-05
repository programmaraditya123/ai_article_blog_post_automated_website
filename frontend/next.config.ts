import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions:{
    additonalData:`$var:red;`
  }
};

export default nextConfig;
