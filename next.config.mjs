/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    // shiki is ESM; keep it out of the server bundle transform issues
    serverComponentsExternalPackages: ["shiki"],
  },
};

export default nextConfig;
