/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(59 130 246)',
        primaryHover: 'rgb(219 234 254)',
        primarySelected: 'rgb(37 99 235)',
      }
    },
  },
  plugins: [],
}

