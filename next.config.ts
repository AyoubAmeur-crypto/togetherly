import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/story',
        destination: '/',
        permanent: true,
      },
      {
        source: '/couples-money-planner',
        destination: '/products/couples-money-planner',
        permanent: true,
      },
      {
        source: '/product',
        destination: '/products/couples-money-planner',
        permanent: true,
      },
      {
        source: '/showcase',
        destination: '/products/couples-money-planner',
        permanent: true,
      },
      {
        source: '/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blogs/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
