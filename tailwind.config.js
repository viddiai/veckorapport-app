/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        apple: {
          blue: '#007AFF',
          gray: {
            50: '#F5F5F7',
            100: '#E8E8ED',
            200: '#D2D2D7',
            300: '#B0B0B5',
            400: '#86868B',
            500: '#6E6E73',
            600: '#515154',
            700: '#3A3A3C',
            800: '#2C2C2E',
            900: '#1C1C1E',
          }
        }
      }
    },
  },
  plugins: [],
}
