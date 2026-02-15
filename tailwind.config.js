/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            red: "#ef4444",
            dark: "#000000",
          },
        },
        boxShadow: {
          glow: "0 0 40px rgba(239, 68, 68, 0.5)",
        },
      },
    },
    plugins: [],
  };
  