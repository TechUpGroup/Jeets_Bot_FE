const { nextui } = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        titanOne: 'var(--chakra-fonts-titanOne)',
        inter: 'var(--chakra-fonts-inter)',
        sfPro: 'SF Pro Display',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
