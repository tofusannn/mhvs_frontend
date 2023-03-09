/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: false,
  i18n: {
    locales: ["th", "mm", "ls", "cd"],
    defaultLocale: "th",
    localeDetection: false,
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
