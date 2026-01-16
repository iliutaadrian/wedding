/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin-slow 20s linear infinite",
        "spin-music": "spin-slow 6s linear infinite",
      },
      keyframes: {
        "spin-slow": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        xs: ["0.9rem", { lineHeight: "1.2rem" }],
        sm: ["1.05rem", { lineHeight: "1.4rem" }],
        base: ["1.2rem", { lineHeight: "1.8rem" }],
        lg: ["1.35rem", { lineHeight: "2rem" }],
        xl: ["1.5rem", { lineHeight: "2rem" }],
        "2xl": ["1.8rem", { lineHeight: "2.25rem" }],
        "3xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "4xl": ["2.7rem", { lineHeight: "1.1" }],
        "5xl": ["3.6rem", { lineHeight: "1.1" }],
        "6xl": ["4.5rem", { lineHeight: "1" }],
        "7xl": ["5.4rem", { lineHeight: "1" }],
        "8xl": ["7.2rem", { lineHeight: "1" }],
        "9xl": ["9.6rem", { lineHeight: "1" }],
      },
      colors: {
        cream: "#fffdfc",
        gold: "#dcb46d",
        peach: "#f1efe8",
        blue: "#193B35", // #0c142c
        pink: "#ffbab8",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
