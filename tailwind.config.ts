import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f172a",
          accent: "#f59e0b"
        }
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1200px"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
