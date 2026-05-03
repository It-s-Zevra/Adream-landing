import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary darks
        ink: {
          950: '#0A0A0A', // Negro profundo
          900: '#141414', // Negro carbón
          800: '#1F1F1F', // Gris noche
        },
        // Lime accent (signature)
        lime: {
          DEFAULT: '#F0FF5F',
          soft: '#E8F757',
        },
        // Light neutrals
        cream: '#F5F5F2',
        line: {
          dark: '#1F1F1F',
          light: '#E5E5E5',
        },
        muted: {
          dark: '#B3B3B3', // body sobre oscuro
          DEFAULT: '#6B6B6B', // gris UI
          light: '#404040', // body sobre claro
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
        wider: '+0.05em',
      },
      boxShadow: {
        'glow-sm': '0 0 30px rgba(240, 255, 95, 0.3)',
        glow: '0 0 40px rgba(240, 255, 95, 0.5)',
        'glow-lg': '0 0 60px rgba(240, 255, 95, 0.6)',
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'float-fast': 'float 4.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        aurora: 'aurora 60s linear infinite',
        'aurora-fast': 'aurora 40s linear infinite',
        'blob-1': 'blob1 22s ease-in-out infinite',
        'blob-2': 'blob2 28s ease-in-out infinite',
        'blob-3': 'blob3 18s ease-in-out infinite',
        'blob-4': 'blob4 24s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 14s linear infinite reverse',
        'ping-slow': 'ping 2.4s cubic-bezier(0,0,0.2,1) infinite',
        scanline: 'scanline 5s linear infinite',
        marquee: 'marquee 40s linear infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 30px rgba(240, 255, 95, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 60px rgba(240, 255, 95, 0.6)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        aurora: {
          '0%': {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          '100%': {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        blob1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(60px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-40px, 60px) scale(0.95)' },
        },
        blob2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-50px, 50px) scale(1.05)' },
          '66%': { transform: 'translate(40px, -30px) scale(0.9)' },
        },
        blob3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(40px, 40px) scale(1.15)' },
        },
        blob4: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-60px, -20px) scale(1.08)' },
        },
      },
      backgroundImage: {
        'grid-tech':
          'linear-gradient(to right, #1F1F1F 1px, transparent 1px), linear-gradient(to bottom, #1F1F1F 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-80': '80px 80px',
      },
    },
  },
  plugins: [],
};

export default config;
