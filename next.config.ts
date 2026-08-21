import type { NextConfig } from "next";

// The site is served from a project page at kooldudegamedev.github.io/portfolio,
// so every asset/route is prefixed with /portfolio. Set NEXT_PUBLIC_BASE_PATH=""
// when serving from a root domain instead.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
