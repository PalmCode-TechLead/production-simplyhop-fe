import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1344px",
      },
      colors: {
        green: {
          "500": "#5AC53D",
        },
        neutral: {
          50: "#F6F6F6",
          "300": "#C3C3C3",
        },
      },
    },
  },
};

export default config;
