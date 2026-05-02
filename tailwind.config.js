/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          950: "#08090c",
          900: "#0d0f14",
          850: "#12151b",
          800: "#171b22",
          700: "#232935",
        },
        accent: {
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        resolve: {
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
        },
        caution: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
        danger: {
          400: "#fb7185",
          500: "#f43f5e",
        },
      },
      boxShadow: {
        soft: "0 20px 70px rgba(0, 0, 0, 0.32)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
