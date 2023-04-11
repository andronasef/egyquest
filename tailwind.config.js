/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C09D6F",
        container: "#E1BF9C",
        surface: "#a37850"
      }
    },
  },
  plugins: [],
}