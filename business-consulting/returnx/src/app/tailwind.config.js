/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'google': {
          'blue': '#4e8de7',
          'purple': '#9374c3',
          'pink': '#b86991',
          'indigo': '#837bcf',
          'dark': '#595d82',
          'light-blue': '#5484b9',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse': 'pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulse: {
          '0%, 100%': { transform: 'rotate(45deg) scale(1)' },
          '50%': { transform: 'rotate(45deg) scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};