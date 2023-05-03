import path from 'path';

/**
 * @type {import('next-i18next').UserConfig}
 */
const config = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },
  localePath: path.resolve('./public/locales'),
};

export default config;
