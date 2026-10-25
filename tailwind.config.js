/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#282B4A',
          900: '#33365A',
          800: '#3E416A',
          700: '#4A4D7A',
          600: '#5B5B8A',
        },
        cream: {
          DEFAULT: '#EEEBDA',
          50: '#FAF9F5',
          100: '#F5F3EA',
          200: '#EEEBDA',
          300: '#E0DCCA',
          400: '#C9C4AB',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#D4BA85',
          dark: '#B8944F',
        },
      },
      fontFamily: {
        heading: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        body: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
