/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkModeNormalTextColor: "#a3a3a3",
        darkModeHeadingTextColor: "#d4d4d4",
        darkModeBgColor: "#171717",
        darkModeBorderColor: "#737373",
        darkModeHoverColor: "#f5f5f5",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
