// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  // i18next-http-backend
  // loads translations from your server/public folder e.g. /public/locales/{lng}/{namespace}.json
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // debug: true, // Uncomment to see logs in the console, helpful during development
    fallbackLng: 'en', // Default language if detected language is not available
    supportedLngs: ['en', 'hi', 'kn'], // List of supported languages

    // Define where translations are stored (can be 'translation', 'common', etc.)
    // If you only have one file per language, 'translation' is common.
    ns: ['translation'], // 'translation' is the default namespace
    defaultNS: 'translation',

    interpolation: {
      escapeValue: false, // React already safes from xss
    },

    backend: {
      // Path to your translation files.
      // {lng} will be replaced with the language code (en, hi, kn)
      // {ns} will be replaced with the namespace (translation)
      // This assumes your locales folder is in the `public` directory of your React app
      // so they can be fetched via HTTP.
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Options for LanguageDetector
    detection: {
      // Order and from where user language should be detected
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

      // Keys or params to lookup language from
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // Caches the language in localStorage
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'], // Languages to not persist (e.g., "in-context editor")

      // Optional html tag attribute to lookup language from, e.g. <html lang="en">
      htmlTag: document.documentElement,
    },

    react: {
      useSuspense: true, // Recommended: this allows translations to be loaded asynchronously
                         // You'll need to wrap your App or routes in <Suspense fallback="...">
    },
  });

export default i18n;