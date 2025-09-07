import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  experimental: {
    // cacheComponents: true,
    // staleTimes: {
    //   dynamic: 0,
    //   static: 0,
    // },
  }
};

export default nextConfig;
