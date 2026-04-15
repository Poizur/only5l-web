import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#1d4ed8",  // primary
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#1e3260",
        },
        surface: {
          0:   "#ffffff",
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        accent: "#f59e0b",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#1e293b",
            lineHeight: "1.75",
            "h1, h2, h3, h4": {
              fontWeight: "700",
              letterSpacing: "-0.025em",
            },
            a: {
              color: "#1d4ed8",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": { textDecoration: "underline" },
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
