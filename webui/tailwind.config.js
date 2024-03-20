const { violet, blackA, slate, mauve, green, red } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem"
      }
    },
    extend: {
      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
        ...slate,
        ...red,
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554"
        }
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        contentShow: {
          from: { opacity: "0", transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" }
        },
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" }
        },
        slideIn: {
          from: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
          to: { transform: "translateX(0)" }
        },
        swipeOut: {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + var(--viewport-padding)))" }
        },
        flip: {
          to: {
            transform: "rotate(360deg)"
          }
        },
        rotate: {
          to: {
            transform: "rotate(90deg)"
          }
        }
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")({ strategy: "base" })]
};
