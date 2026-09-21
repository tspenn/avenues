import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.skylandapps.com" },
      { protocol: "https", hostname: "skylandapps.com" },
      { protocol: "https", hostname: "go-bible.com" },
      { protocol: "https", hostname: "senses.fineshoppes.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "avenues.skylandpublishing.com" }],
        destination: "https://avenuesfiles.com/:path*",
        permanent: true,
      },
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
      {
        source: "/posts/they-do-not-turn-on-a-dime",
        destination: "/writers/whit-boone/they-do-not-turn-on-a-dime",
        permanent: true,
      },
      {
        source: "/posts/now-what",
        destination: "/posts/you-hedged-now-what",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
