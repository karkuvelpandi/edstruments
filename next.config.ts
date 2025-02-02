import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (
    config, options
) => {
    // Important: return the modified config
    config.module.rules.push({
        test: /\.node/,
        use: 'raw-loader',
    });
    return config;
}
  /* config options here */
};

export default nextConfig;
