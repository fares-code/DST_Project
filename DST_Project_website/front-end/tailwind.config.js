/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fares: '#190C2C',
        fares2: '#1A0C27',
        darkPurple: '#1A0C27',
        lightPurple: '#3C1E51',
      },
      boxShadow: {
        glow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)', // توهج أبيض
      },
      animation: {
        'glow-animation': 'glow 1.5s ease-in-out infinite', // تأثير التوهج المتحرك
      },
      keyframes: {
        glow: {
          '0%': {
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)',
            filter: 'brightness(1)',
          },
          '50%': {
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.6)',
            filter: 'brightness(1.5)',
          },
          '100%': {
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)',
            filter: 'brightness(1)',
          },
        },
      },
    },
  },
  plugins: [],
}
