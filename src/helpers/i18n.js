import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Languages
import en from '../lang/en_EN.json';

i18n.use(LanguageDetector).init({
  resources: {
    en,
  },

  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'Development' ? true : false,

  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
