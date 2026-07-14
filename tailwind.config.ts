import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#34B26A',
          teal: '#21A6A6',
          blue: '#2777C9',
          navy: '#0F172A',
          grey: '#F5F7FA',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'Manrope', 'sans-serif'],
        display: ['Satoshi', 'Inter', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 50px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config
