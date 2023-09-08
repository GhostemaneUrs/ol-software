/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
export default withMT({
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-gray': {
          90: '#F6F7FB',
          80: '#6C737F',
          50: '#94969A',
          60: '#DFDFDF',
        },
        'custom-blue': {
          90: '#6366F1',
          80: '#190A3D',
        },
        'custom-red': {
          90: '#ff7885',
        },
        'custom-yellow': {
          90: '#f79009',
        },
        'custom-green': {
          90: '#10b981',
        },
        'custom-purple': {
          90: '#6E37EE',
        },
        'off-white': '#f1f5fd',
        'light-gray': '#bcc9d9',
      },
      boxShadow: {
        sidebar: '2px 4px 4px rgba(17, 8, 38, 0.25)',
        menubar: '2px 2px 4px rgba(25, 10, 61, 0.25)',
      },
      backgroundColor: {
        'table-header': 'rgba(247, 247, 247, 1)',
      },
      backgroundImage: {
        'radial-gradient-signin':
          'radial-gradient(50% 50% at 50% 50%, rgb(18, 38, 71) 0%, rgb(9, 14, 35) 100%)',
      },
    },
  },
  plugins: [],
})
