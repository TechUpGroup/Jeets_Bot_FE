/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: 'var(--chakra-fonts-rajdhani)',
      },
    },
  },
  plugins: [],
}

