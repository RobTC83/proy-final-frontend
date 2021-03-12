
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'c-yellow':'#ffd500','c-peach':'#ffbd59','c-green':'#08A408','c-red':'#D31E0F','c-blue':'#0C4BC1'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
