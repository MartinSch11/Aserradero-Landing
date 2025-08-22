/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef7f1',
          100: '#d7ecdf',
          200: '#bde0cc',
          300: '#a2d4b8',
          400: '#68b88e',
          500: '#1e7a46', // tu verde principal
          600: '#17633a',
          700: '#12502f', // 👈 ya podés usar text-brand-700
          800: '#0e3e24',
          900: '#092a18',
        },
        wood: {
          500: '#8b5e34',
          700: '#5e4024',
        },
        steel: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        ink: '#0e1113',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
