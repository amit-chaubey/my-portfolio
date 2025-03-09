/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'wave': 'wave 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '60%': { transform: 'rotate(10deg)' },
          '80%': { transform: 'rotate(-2deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: "class"
}

