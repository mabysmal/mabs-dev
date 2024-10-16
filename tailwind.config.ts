import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'magic-retro': ['MagicRetro', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'dark-purple': '#0b081b',
        'purple': '#4b3286',
        'gray' : '#817f87',
        'purple-gray' : '#312d47',
      },
      
    },
  },
  plugins: [],
};
export default config;
