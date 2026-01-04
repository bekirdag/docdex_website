module.exports = {
  darkMode: 'class',
  content: ['./index.html', './App.tsx', './index.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        brand: {
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04'
        },
        page: '#030303',
        surface: {
          50: '#0A0A0A',
          100: '#121212',
          200: '#1E1E1E',
          300: '#2D2D2D',
          400: '#404040'
        }
      },
      backgroundImage: {
        'glow-gradient': 'radial-gradient(circle at 50% 0%, rgba(250, 204, 21, 0.08) 0%, rgba(0, 0, 0, 0) 60%)',
        'shiny-gold': 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
        'shiny-dark': 'linear-gradient(180deg, #262626 0%, #171717 100%)'
      }
    }
  },
  plugins: []
};
