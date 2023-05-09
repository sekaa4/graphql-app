import path from 'path';

const supportedLocales = {
  ENGLISH: 'en',
  RUSSIAN: 'ru',
};

const defaultLocale = supportedLocales.ENGLISH;
const supportedLanguages = Object.values(supportedLocales);

/**
 * @type {import('next-i18next').UserConfig}
 */
const config = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale,
    locales: supportedLanguages,
  },
  localePath: typeof window === 'undefined' ? path.resolve('./public/locales') : '/locales',
};

export default config;
