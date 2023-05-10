import 'i18next';

import type common from '../../../public/locales/en/common.json';

interface I18nNamespaces {
  common: typeof common;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
