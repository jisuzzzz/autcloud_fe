import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["yjs"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'liveblocks.io',
        pathname: '/avatars/**',
      },
    ],
  },
}
export default nextConfig;
