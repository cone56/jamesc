/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#ffff00",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(11deg)" },
          "3%": { transform: "rotate(11deg)" },
          "6%": { transform: "rotate(-11deg)" },
          "10%": { transform: "rotate(11deg)" },
          "13%": { transform: "rotate(-11deg)" },
          "16%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
};
