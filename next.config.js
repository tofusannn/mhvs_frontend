/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "th"],
    defaultLocale: "th",
    localeDetection: false,
  },
};

module.exports = nextConfig;
