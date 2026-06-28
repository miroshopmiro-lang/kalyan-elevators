/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0C', // Keep for footer or dark text
        charcoal: '#1F2937', // Primary dark text
        platinum: '#F9FAFB', // Lightest gray for section bg
        gold: '#B45309',     // Amber-gold for light theme accent
        bronze: '#854D0E',   // Darker gold for text
        silver: '#4B5563',   // Medium gray text
        navy: '#0F172A',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 20px rgba(180,83,9,0.06)',
        'gold-strong': '0 4px 25px rgba(180,83,9,0.15)',
        standard: '0 4px 30px rgba(0,0,0,0.03)',
      },
      backgroundImage: {
        'metallic-gold': 'linear-gradient(to right, #B45309, #D97706, #92400E)',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-30px)', opacity: '0' },
        },
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(12px)', opacity: '0' },
        },
      },
      animation: {
        floatUp: 'floatUp 6s ease-in-out infinite',
        scrollDot: 'scrollDot 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
