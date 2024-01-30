/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      sixtyfour: ["Sixtyfour", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        res: "repeat(auto-fit, minmax(18rem, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cyberpunk",
      "default",
      "forest",
      "halloween",
      "synthwave",
      "retro",
      "valentine",
      "bumblebee",
      "luxury",
      "dracula",
      "aqua"
    ],
  },
};
