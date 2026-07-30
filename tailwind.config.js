/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Della Respira"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        danger: '#E24B4A',
        warning: '#BA7517',
        success: '#639922',
        neutral: '#5F5E5A',
        primary: '#185FA5',
        ink: '#2C2C2A',
        'bg-light': '#F1EFE8',
        'bg-dark': '#2C2C2A',
        surface: '#F1EFE8',
      },
      borderRadius: {
        card: '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      backdropBlur: {
        glass: '12px',
        'glass-heavy': '24px',
      },
      boxShadow: {
        'depth-sm': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px -2px rgba(24,95,165,0.06)',
        'depth-md': '0 4px 6px -1px rgba(0,0,0,0.04), 0 12px 24px -4px rgba(24,95,165,0.08)',
        'depth-lg': '0 8px 16px -2px rgba(0,0,0,0.04), 0 24px 48px -8px rgba(24,95,165,0.1)',
        'glow': '0 0 20px -4px rgba(24,95,165,0.15)',
        'glow-lg': '0 0 40px -8px rgba(24,95,165,0.2)',
        'glass': 'inset 0 1px 0 0 rgba(255,255,255,0.12), 0 8px 32px -8px rgba(24,95,165,0.1)',
        'glass-hover': 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 12px 48px -12px rgba(24,95,165,0.15)',
      },
      height: {
        'btn-xs': '28px',
        'btn-sm': '36px',
        'btn-md': '44px',
        'btn-lg': '52px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'fill-bar': 'fillBar 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'shimmer': 'shimmer 2s infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fillBar: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--bar-width)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
