/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        framer: {
          lightBg: '#EBEAE6',
          lightCard: '#F5F4F0',
          darkBg: '#000000',
          darkCard: '#0D0D0D',
          gold: '#E2B857',
          goldLight: '#F5D77F',
          goldDark: '#B88E32',
          textDark: '#111111',
          textMuted: '#666666',
          borderLight: '#DCDAD4',
          borderDark: '#222222'
        }
      },
      fontFamily: {
        sans: ['"Galano Grotesque"', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        galano: ['"Galano Grotesque"', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        swarsh: ['"Swarsh Daisy"', '"Swash Daisy"', 'Playfair Display', 'Georgia', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
