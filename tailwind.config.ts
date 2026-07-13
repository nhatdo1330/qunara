import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { midnight: "#07111f", gold: "#D4AF37", ivory: "#F4F2EC", mist: "#AAB3C0", panel: "#0D1929" },
    fontFamily: {
      sans: ["Inter", "Avenir Next", "Avenir", "Segoe UI", "sans-serif"],
      serif: ["Iowan Old Style", "Baskerville", "Times New Roman", "serif"]
    },
    boxShadow: { glow: "0 18px 60px rgba(0,0,0,.28)" }
  } }, plugins: []
};
export default config;
