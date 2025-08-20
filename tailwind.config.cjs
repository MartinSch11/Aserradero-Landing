/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#eef7f1', 100: '#d7ecdf', 500: '#1e7a46', 600: '#17633a' },
        wood: { 500: '#8b5e34', 700: '#5e4024' },
        steel: { 500: '#2f4858', 700: '#233744' },
        ink: '#0e1113'
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: []
};
