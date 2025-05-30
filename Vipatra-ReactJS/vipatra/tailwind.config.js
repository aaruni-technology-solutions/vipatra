// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this to match your project structure
    // e.g., if your components and pages are directly in src: "./src/*.{js,jsx,ts,tsx}"
    // If you have a public/index.html that might use Tailwind classes: "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3A6F48', // Deep Green
          dark: '#2E583A',    // Darker green for hover
          hover: '#315C3F'   // Optional: A specific hover shade if needed
        },
        secondary: '#8B5A2B', // Earthy Brown
        accent: {
          DEFAULT: '#F4C842', // Soft Gold
          dark: '#d9b735'     // Darker gold for hover
        },
        background: '#FAF9F5', // Off-White
        cardBg: '#FFFFFF',     // White (for cards, inputs, light sidebar)

        // Text Colors
        textLight: '#FFFFFF',      // For text on dark backgrounds
        textDark: '#1F2937',       // For text on light/accent backgrounds (like on gold buttons)
        textOnPrimary: '#FFFFFF',  // Specifically for text on primary background
        textOnSecondary: '#FFFFFF',// Specifically for text on secondary background (if you use dark secondary bg)

        // Border Colors
        borderLight: '#E5E7EB',    // Softer border (like gray-200)
        borderDefault: '#D1D5DB',   // Default border for cards (like gray-300)
        borderInput: '#9CA3AF',     // More visible input border (like gray-400)

        // Status/Semantic Colors
        danger: {
          DEFAULT: '#DC2626', // red-600
          light: '#FEE2E2',   // red-100
          dark: '#B91C1C'     // red-700 (for text on light danger bg)
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
        }
      },
      fontFamily: {
        sans: ['Lato', 'Roboto', 'sans-serif'],
        heading: ['Playfair Display', 'Poppins', 'serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem', // Tailwind's default (4px)
        md: '0.375rem',    // Tailwind's md (6px)
        lg: '0.75rem',     // Your custom larger radius (12px)
        full: '9999px',
      },
      boxShadow: {
        soft: '0 4px 10px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)', // Tailwind's sm
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        sidebar: '0 2px 8px rgba(0,0,0,0.08)' // Your custom sidebar shadow
      },
      // You can extend other theme sections like spacing, screens, etc., if needed
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Highly recommended for better default form styling
    // Add other Tailwind plugins here if you use them
  ],
};