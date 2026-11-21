import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tema Hijau Medis Modern / Kesehatan Puskesmas
        medical: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981", // Vibrant emerald green
          600: "#059669", // Primary Modern Medical Emerald
          700: "#047857", // Deep emerald
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        healthGreen: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        healthRed: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
      },
      borderRadius: {
        card: "16px",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ['"Outfit"', '"Plus Jakarta Sans"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(6, 78, 59, 0.06), 0 2px 8px -2px rgba(6, 78, 59, 0.03)",
        card: "0 10px 30px -6px rgba(5, 150, 105, 0.10), 0 4px 12px -2px rgba(15, 23, 42, 0.04)",
        elevated: "0 20px 40px -10px rgba(4, 120, 87, 0.18), 0 8px 16px -6px rgba(15, 23, 42, 0.05)",
        glow: "0 0 25px -5px rgba(16, 185, 129, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
