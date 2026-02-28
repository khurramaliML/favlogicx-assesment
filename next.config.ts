import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
    ],
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/dashboard', 
        destination: '/dashboard/inbox', 
        permanent: false,           
      },
    ];
  },
};

export default nextConfig;
