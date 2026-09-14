import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/boone",
        destination: "/writers/whit-boone",
        permanent: true,
      },
      {
        source: "/posts/resistance-and-its-cost",
        destination: "/writers/whit-boone/resistance-and-its-cost",
        permanent: true,
      },
      {
        source: "/posts/the-oil-and-the-deputy",
        destination: "/writers/whit-boone/the-oil-and-the-deputy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
