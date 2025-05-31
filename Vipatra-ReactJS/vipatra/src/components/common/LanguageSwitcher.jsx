// src/components/common/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', lang: 'English' },
  { code: 'hi', lang: 'हिन्दी' }, // Hindi
  { code: 'kn', lang: 'ಕನ್ನಡ' }, // Kannada
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        defaultValue={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="font-sans bg-primary-dark text-textOnPrimary text-xs px-3 py-1.5 rounded-md shadow-soft focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer"
        // Note: Tailwind Forms plugin provides better default select styling.
        // If not using it, you might need more custom styling for the arrow.
      >
        {languages.map((lng) => (
          <option key={lng.code} value={lng.code} className="bg-cardBg text-textDark">
            {lng.lang}
          </option>
        ))}
      </select>
      {/* You might want a custom dropdown arrow if not using @tailwindcss/forms */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-textOnPrimary">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;