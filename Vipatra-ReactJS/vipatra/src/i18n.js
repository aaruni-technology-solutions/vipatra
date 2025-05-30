// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Loads translations from /public/locales
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    supportedLngs: ['en', 'hi', 'kn'], // Your supported languages
    fallbackLng: 'en', // Default language if detection or selected language fails
    debug: process.env.NODE_ENV === 'development', // Logs i18n events to console in dev mode

    // Backend options for i18next-http-backend
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },

    // Namespace configuration (optional, 'translation' is the default)
    // ns: ['common', 'invoice'], // Example: if you split translations
    defaultNS: 'translation',   // Default namespace to use

    interpolation: {
      escapeValue: false, // React already protects from XSS
      format: function (value, format, lng) {
        // Date formatting
        if (value instanceof Date) {
          try {
            return new Intl.DateTimeFormat(lng, getDateTimeFormatOptions(format)).format(value);
          } catch (error) {
            console.error("Error formatting date:", error, "Value:", value, "Format:", format, "Lng:", lng);
            return value.toLocaleDateString(lng); // Fallback
          }
        }
        // Number and currency formatting
        if (typeof value === 'number' && format) {
          const [type, styleOrCurrency] = format.split(':'); // e.g., "currency:INR" or "number:decimal"
          let options = {};

          if (type === 'currency' && styleOrCurrency) {
            options = {
              style: 'currency',
              currency: styleOrCurrency.toUpperCase(),
              // minimumFractionDigits: 2, // Add more currency specific options if needed
            };
          } else if (type === 'number' && styleOrCurrency) {
            options = {
              style: styleOrCurrency, // 'decimal', 'percent'
              // minimumFractionDigits: 2,
            };
          } else if (type === 'number') { // Default number formatting if no style
            options = {
              style: 'decimal'
            }
          }

          try {
            return new Intl.NumberFormat(lng, options).format(value);
          } catch (error) {
            console.error("Error formatting number:", error, "Value:", value, "Format:", format, "Lng:", lng);
            return value.toLocaleString(lng); // Fallback
          }
        }
        return value;
      },
    },

    react: {
      useSuspense: true, // Recommended for Suspense-based data loading
    },
  });

// Helper function for date format options
function getDateTimeFormatOptions(formatString) {
  switch (formatString) {
    case 'short':
      return { year: 'numeric', month: 'numeric', day: 'numeric' };
    case 'long':
      return { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    case 'time':
      return { hour: 'numeric', minute: 'numeric' };
    // Add more predefined formats as needed
    default: // A sensible default
      return { year: 'numeric', month: 'short', day: 'numeric' };
  }
}

export default i18n;