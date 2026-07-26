// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "var(--color-brand-900)",
          500: "var(--color-brand-500)",
          gold: "var(--color-brand-gold)",
        },
        surface: {
          light: "var(--color-surface-light)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
      },
      fontFamily: {
        // Use the CSS variable created by next/font
        sans: ["var(--font-nunito)", "sans-serif"],
        display: ["var(--font-nunito)", "sans-serif"], // you can keep a separate display class or remove it
      },
    },
  },
  plugins: [],
};
export default config;