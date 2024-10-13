import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screen: {},
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      "2xl": "1280px",
      "3xl": "1600px",
    },
    fontSize: {
      sm: "0.75rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.75rem",
      "4xl": "2rem",
      "5xl": "2.25rem",
      "6xl": "2.5rem",
      "7xl": "2.75rem",
      "8xl": "3rem",
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".min-w-sm": {
          minWidth: "375px",
        },
      });
    }),
  ],
};
export default config;
