import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#BA2E37",
          dark: "#701C21",
          light: "#D68287",
        },
        secondary: {
          DEFAULT: "#93E5F2",
          dark: "#588991",
          light: "#C9F2F9",
        },
        surface: {
          DEFAULT: "#212121",
          dark: "#292929",
          light: "#2C2C2C",
        },
        status: {
          success: "#B9FF74",
          warning: "#FE7171",
          error: "#FEDD68",
          info: "#81E8FF",
          disabled: "#5A5A5A",
        },
        on: {
          surface: {
            DEFAULT: "#E9E9E9",
            light: "#FFFFFF",
            dark: "#A8A8A8",
            darker: "#5F5F5F",
          },
          primary: {
            DEFAULT: "#E9E9E9",
            light: "#FFFFFF",
            dark: "#A8A8A8",
          },
          secondary: {
            DEFAULT: "#E9E9E9",
            light: "#FFFFFF",
            dark: "#A8A8A8",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
