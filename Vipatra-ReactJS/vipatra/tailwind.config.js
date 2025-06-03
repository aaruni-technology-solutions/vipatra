// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3A6F48', // Deep Green
          dark: '#2E583A',    // Darker green for hover
          hover: '#315C3F'    // Optional: A specific hover shade if needed
          // REMOVED danger, success, warning, info from here
        },
        secondary: '#8B5A2B', // Earthy Brown
        accent: {
          DEFAULT: '#F4C842', // Soft Gold
          dark: '#d9b735'     // Darker gold for hover
        },
        background: '#FAF9F5', // Off-White
        cardBg: '#FFFFFF',     // White (for cards, inputs, light sidebar)

        // Text Colors
        textLight: '#FFFFFF',
        textDark: '#1F2937',
        textOnPrimary: '#FFFFFF',
        textOnSecondary: '#FFFFFF',

        // Border Colors
        borderLight: '#E5E7EB',
        borderDefault: '#D1D5DB',
        borderInput: '#9CA3AF',

        // Status/Semantic Colors - MOVED TO TOP LEVEL within colors object
        danger: {
          DEFAULT: '#DC2626', // red-600
          light: '#FEE2E2',   // red-100
          dark: '#B91C1C'     // red-700
        },
        success: {
          DEFAULT: '#16A34A', // green-600
          light: '#DCFCE7',   // green-100
          dark: '#15803D'     // green-700
        },
        warning: {
          DEFAULT: '#F59E0B', // amber-500
          light: '#FEF3C7',   // amber-100
          dark: '#D97706'     // amber-600
        },
        info: { // THIS IS THE KEY FOR YOUR bg-info-light and text-info-dark
          DEFAULT: '#3B82F6', // This will be `bg-info`, `text-info`
          light: '#DBEAFE',   // This will be `bg-info-light`, `text-info-light`
          dark: '#2563EB'    // This will be `bg-info-dark`, `text-info-dark`
        }
      },
      fontFamily: {
        sans: ['Lato', 'Roboto', 'sans-serif'],
        heading: ['Playfair Display', 'Poppins', 'serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.75rem',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 4px 10px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        sidebar: '0 2px 8px rgba(0,0,0,0.08)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};