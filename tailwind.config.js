/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        clamp: "clamp(1rem, 5vw, 3rem)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sixtyfour: ["Sixtyfour", "sans-serif"],
        Playfairdisplay: ["Playfairdisplay", "serif"],
      },
      gridTemplateColumns: {
        res: "repeat(auto-fit, minmax(18rem, 1fr))",
        res2: "repeat(auto-fit, minmax(24rem, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  
};
