/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        surface: {
          0: "#ffffff",
          50: "#f8faf9",
          100: "#f1f5f3",
          200: "#e2e8e5",
          800: "#1a2e28",
          900: "#0f1f1a",
          950: "#091410",
        },
        accent: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.25rem, 5vw, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "800" },
        ],
        "display-lg": [
          "clamp(1.75rem, 3.5vw, 2.75rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(1.25rem, 2.5vw, 1.75rem)",
          { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "count-up": "countUp 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        pulse_slow: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
