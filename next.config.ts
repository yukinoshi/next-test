import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'duyi-resource.oss-cn-beijing.aliyuncs.com'
      }
    ]
  }
};

export default nextConfig;
