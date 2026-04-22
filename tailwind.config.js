/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef1ff",
          100: "#dbe4ff",
          200: "#b8c8ff",
          300: "#8ea2ff",
          400: "#6075f4",
          500: "#3f55dc",
          600: "#2d3bc1",
          700: "#1f2aba",
          800: "#1a2499",
          900: "#171f73",
          950: "#0d1145",
        },
      },
    },
  },
  plugins: [],
};
