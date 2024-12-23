/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      perspective: {
        '500': '500px',
        '1000': '1000px',
      },
      rotate: {
        '10': '10deg',
        '60': '60deg',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-slow': 'gradient-slow 15s ease infinite',
        'gradient-slower': 'gradient-slower 20s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-slow': {
          '0%, 100%': {
            transform: 'translate(0%, 0%)',
          },
          '50%': {
            transform: 'translate(5%, 5%)',
          },
        },
        'gradient-slower': {
          '0%, 100%': {
            transform: 'translate(0%, 0%)',
          },
          '50%': {
            transform: 'translate(-5%, -5%)',
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.perspective-500': {
          perspective: '500px',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.rotateX-10': {
          transform: 'rotateX(10deg)',
        },
        '.rotateX-60': {
          transform: 'rotateX(60deg)',
        },
      })
    },
  ],
}