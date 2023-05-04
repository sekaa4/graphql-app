import nextI18nConfig from './next-i18next.config.mjs';

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  i18n: nextI18nConfig.i18n,
};

export default nextConfig;
