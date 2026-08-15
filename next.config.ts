import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The Conqr platform and landing case studies were merged into one
     project at /work/conqr. Both former URLs are live and linked, so they
     redirect permanently rather than 404. */
  async redirects() {
    return [
      { source: "/work/conqr-platform", destination: "/work/conqr", permanent: true },
      { source: "/work/conqr-landing", destination: "/work/conqr", permanent: true },
    ];
  },
};

export default nextConfig;
