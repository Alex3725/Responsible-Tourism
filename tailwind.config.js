/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.ts"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Source Sans 3", "sans-serif"],
      },
      colors: {
        ocean: {
          50: "#eef8fb",
          200: "#b6e3ef",
          400: "#4fc0d6",
          600: "#1a7f96",
          800: "#0d4b5f",
          950: "#072733",
        },
        lagoon: {
          200: "#b9f5e6",
          400: "#53d1c4",
          600: "#1f8f88",
        },
        coral: {
          200: "#ffd4c2",
          400: "#ff8a6b",
          600: "#d9583d",
        },
        sand: {
          50: "#fff7e6",
          200: "#f3d9b1",
          400: "#e0b36b",
          600: "#b1782f",
          800: "#6f4a1a",
        },
      },
      boxShadow: {
        card: "0 24px 60px -32px rgba(2, 30, 38, 0.45)",
        glow: "0 0 40px rgba(79, 192, 214, 0.35)",
      },
      backgroundImage: {
        "bora-wash":
          "radial-gradient(circle at 20% 20%, rgba(83, 209, 196, 0.35), transparent 45%), radial-gradient(circle at 80% 10%, rgba(255, 138, 107, 0.22), transparent 40%), linear-gradient(120deg, rgba(238, 248, 251, 0.9), rgba(255, 247, 230, 0.9))",
      },
    },
  },
  plugins: [],
};
