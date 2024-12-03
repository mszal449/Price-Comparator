import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["app", "components"],
  },
};

export default nextConfig;
