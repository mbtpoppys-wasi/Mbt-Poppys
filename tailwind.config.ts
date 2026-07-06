import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#151515",
        "charcoal-light": "#1f1f1f",
        "charcoal-card": "#1a1a1a",
        mbt: {
          yellow: "#FFDE00",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "monospace"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        "led-glow": "0 0 10px rgba(255,222,0,0.55), 0 0 30px rgba(255,222,0,0.25)",
        "led-glow-lg": "0 0 20px rgba(255,222,0,0.6), 0 0 60px rgba(255,222,0,0.3)",
      },
      textShadow: {
        led: "0 0 10px rgba(255,222,0,0.8), 0 0 25px rgba(255,222,0,0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utils: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        ".text-shadow-led": {
          textShadow: "0 0 10px rgba(255,222,0,0.8), 0 0 25px rgba(255,222,0,0.4)",
        },
      });
    },
  ],
};

export default config;
