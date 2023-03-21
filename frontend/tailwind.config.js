/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: "#FF4A9E",
        secondary: "#E82E81",
        tertiary: "#5134d3",
        pblue: "#130E86",
        ppurple: "#9118B7",
        "light-sky": "#00B5E6",
        "dark-sky": "#06a6d3",
        "light-orange": "#DB5A3C",
        "dark-orange": "#C6503B",
        danger: "#DC3444",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        fredoka: ["Fredoka One", "cursive"],
      },
      fontSize: {
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "24px",
        "2xl": "36px",
        "3xl": "44px",
      },
    },
  },
};
