/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#212121',
        buttoncolor: '#3780FC',
        buttonhover: '#2E6EE0',
      },
    },
  },
  plugins: [],
}
