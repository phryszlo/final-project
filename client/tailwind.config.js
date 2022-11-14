/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // latoRegular: "Lato-Regular",
        // latoBold: "Lato-Bold",
        burtons: "Burtons",
      },
    },
  },
  plugins: [],
}
