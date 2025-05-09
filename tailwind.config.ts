import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        up: "up 3s linear infinite",
        scaleX: "scaleX 3s linear infinite",
      },
      keyframes: {
        up: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30px)" },
        },
        scaleX: {
          "0%, 100%": { transform: "scaleX(1)" },
          "50%": { transform: "scaleX(0.85)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
