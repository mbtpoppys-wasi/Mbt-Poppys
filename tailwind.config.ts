import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mbtDark: "#151515",
        mbtYellow: "#FFDE00",
        mbtGray: "#EAEAEA",
        mbtCard: "#222222",
        mbtNear: "#0a0a0a",
        // legacy aliases kept so existing class names keep resolving
        charcoal: "#151515",
        "charcoal-light": "#1f1f1f",
        "charcoal-card": "#222222",
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
      keyframes: {
        glowPulse: {
          "0%, 100%": {
            textShadow:
              "0 0 8px rgba(255,222,0,0.5), 0 0 20px rgba(255,222,0,0.25)",
          },
          "50%": {
            textShadow:
              "0 0 16px rgba(255,222,0,0.9), 0 0 42px rgba(255,222,0,0.5)",
          },
        },
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        subtleZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glowPulse 2.4s ease-in-out infinite",
        "fade-slide-up": "fadeSlideUp 0.4s ease-out both",
        "subtle-zoom": "subtleZoom 20s ease-in-out infinite alternate",
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
