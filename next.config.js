/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["de-DE", "en-US"],
    defaultLocale: "en-US",
  },
  images: {
    domains: ["picsum.photos"],
  },
};

module.exports = nextConfig;
