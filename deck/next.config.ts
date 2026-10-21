import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT_EXPORT === "true";
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" } : {}),
  basePath,
  images: { unoptimized: true },
  // CI runs tsc in parallel with the build (see .github/workflows/pages.yml)
  typescript: { ignoreBuildErrors: process.env.SKIP_BUILD_TYPECHECK === "true" },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
