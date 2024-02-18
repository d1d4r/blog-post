/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      sixtyfour: ["Sixtyfour", "sans-serif"],
      Playfairdisplay: ["Playfairdisplay", "serif"],
    },
    extend: {
      gridTemplateColumns: {
        res: "repeat(auto-fit, minmax(18rem, 1fr))",
        res2: "repeat(auto-fit, minmax(24rem, 1fr))",
      },
      // content: {
      //   link: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      //   <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      // </svg>`
      // },
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
      "aqua",
    ],
  },
};
