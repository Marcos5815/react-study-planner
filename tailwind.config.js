/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'white': '#FFFFFF',
        'green-check': '#CAFF59',
        'purple-dark': '#685FD4',
        'gray-dark': '#EAEAEA',
        'purple-light': '#3D2EBD',
        'gray-light': '#504D4D',
        'purple-header': '#8B7BD8',
        'card-dark': '#2D3748',
        'card-darker': '#1A202C',
      },
      fontSize: {
        'h1': ['28px', '120%'],
        'h2': ['20px', '120%'],
        'paragraph-large': ['18px', '150%'],
        'label': ['14px', '150%'],
      },
      fontWeight: {
        'medium': '500',
        'semibold': '600',
      }
    },
  },
  plugins: [],
}