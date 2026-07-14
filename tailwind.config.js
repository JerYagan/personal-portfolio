/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: '#111113',
        card: '#18181b',
        line: '#27272a',
        ink: '#fafafa',
        muted: '#a1a1aa',
        brand: '#6366f1',
        'brand-blue': '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      borderRadius: {
        panel: '12px',
      },
    },
  },
  plugins: [],
}
