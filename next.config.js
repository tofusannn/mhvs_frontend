/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: false,
  i18n: {
    locales: ["en", "th"],
    defaultLocale: "th",
    localeDetection: false,
  },
};

module.exports = nextConfig;
