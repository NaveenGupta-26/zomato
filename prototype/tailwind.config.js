
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        district: {
          purple: '#8b5cf6',
          dark: '#121212',
          gray: '#2a2a2a',
          lightGray: '#a3a3a3',
          green: '#10b981'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
