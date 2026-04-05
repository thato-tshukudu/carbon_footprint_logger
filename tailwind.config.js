/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-emerald': {
          50: '#f3f7f0',
          100: '#e5ede0',
          200: '#cfdcc7',
          300: '#b3c6a6',
          400: '#90aa81',
          500: '#6f8d61',
          600: '#5a744e',
          700: '#4a5f40',
          800: '#3b4b34',
          900: '#2d3929',
          950: '#1f281d',
        },
      },
    },
  },
  plugins: [],
};
