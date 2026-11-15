import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  /* The Conqr platform and landing case studies were merged into one
     project at /work/conqr. Both former URLs are live and linked, so they
     redirect permanently rather than 404. */
  async redirects() {
    return [
      { source: "/work/conqr-platform", destination: "/work/conqr", permanent: true },
      { source: "/work/conqr-landing", destination: "/work/conqr", permanent: true },
    ];
  },
  async rewrites() {
    return [{ source: "/work/:slug.md", destination: "/work/:slug/md" }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
