/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ejs,hbs}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
    colors: {
      dark: '#001329',
      light: '#f3f6f7',
    },
  },
  plugins: [],
};
