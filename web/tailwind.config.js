/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
        alt: 'var(--font-bai-jamjuree)',
      },
      colors:{
        yellow:{
          50: '#fcce32',
        },
        black: {
          50: '#0d0e0e',
        },
        gray: {
          50: '#ebedf1',
          100: '#dadce2',
        },
        white: {
          50: '#fffafa',
          100: '#ffffff',
          200: '#f5f5f5'
        },
        blue:{
          50: '#2c66ce',
        },

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
