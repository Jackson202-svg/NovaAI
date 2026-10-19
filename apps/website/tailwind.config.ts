/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 50px rgba(124, 147, 255, 0.35)',
      },
    },
  },
  plugins: [],
};
