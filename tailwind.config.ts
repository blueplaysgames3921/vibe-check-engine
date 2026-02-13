import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brutal: ["var(--font-archivo)"],
        serif: ["var(--font-instrument)"],
      },
    },
  },
  plugins: [],
};
export default config;
