/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        telemetry: {
          bg: "#0A0A0B",      // Solid True Black
          card: "#121212",    // Deep Charcoal
          border: "#27272A",  // Zinc Border
          accent: "#3B82F6",  // Corporate Blue Accent (Updated from Green)
          white: "#E4E4E7",   // Zinc White
          silver: "#A1A1AA",  // Muted Silver
          darkzinc: "#18181B" // Dark Zinc for button fills
        }
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["Outfit", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      },
      boxShadow: {
        'glow-emerald': '0 0 15px -3px rgba(59, 130, 246, 0.4), 0 0 6px -2px rgba(59, 130, 246, 0.2)',
        'glow-emerald-strong': '0 0 25px -2px rgba(59, 130, 246, 0.6), 0 0 10px -1px rgba(59, 130, 246, 0.4)',
        'glow-card': '0 4px 30px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
