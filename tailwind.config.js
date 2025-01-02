/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        120: "30rem",
      },
      colors: {
        postcl: "#D9D9D9",
        brown: "#A0522D",
      },
      letterSpacing: {
        extrawide: "0.2rem",
      },
      boxShadow: {
        "upward-md":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)", // Custom upward shadow
      },
    },
  },
  plugins: [],
};
