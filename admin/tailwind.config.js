/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      processing_bg: "#C3E1FD", // Custom color for processing status
      delivering_bg: "#FFE5A3", // Custom color for delivering status
      completed_bg: "#FFC5C5", // Custom color for completed status
      cancelled_bg: "#CDFAD5",
      processing_color: "#455DE1",
      delivering_color: "#F29239",
      cancelled_color: "#E93737",
      completed_color: "#3B774F",
    },
  },
};
export const plugins = [];
