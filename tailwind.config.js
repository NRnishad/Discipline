/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          950: "rgb(var(--color-surface-950) / <alpha-value>)",
          900: "rgb(var(--color-surface-900) / <alpha-value>)",
          850: "rgb(var(--color-surface-850) / <alpha-value>)",
          800: "rgb(var(--color-surface-800) / <alpha-value>)",
          700: "rgb(var(--color-surface-700) / <alpha-value>)",
        },
        accent: {
          300: "rgb(var(--color-accent-300) / <alpha-value>)",
          400: "rgb(var(--color-accent-400) / <alpha-value>)",
          500: "rgb(var(--color-accent-500) / <alpha-value>)",
          600: "rgb(var(--color-accent-600) / <alpha-value>)",
        },
        resolve: {
          300: "rgb(var(--color-resolve-300) / <alpha-value>)",
          400: "rgb(var(--color-resolve-400) / <alpha-value>)",
          500: "rgb(var(--color-resolve-500) / <alpha-value>)",
        },
        caution: {
          400: "rgb(var(--color-caution-400) / <alpha-value>)",
          500: "rgb(var(--color-caution-500) / <alpha-value>)",
        },
        danger: {
          400: "rgb(var(--color-danger-400) / <alpha-value>)",
          500: "rgb(var(--color-danger-500) / <alpha-value>)",
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
