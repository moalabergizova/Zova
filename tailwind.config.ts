import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        essence: '#F5F5F3',
        veil: '#E0E0DC',
        smoke: '#6B6B6B',
        carbon: '#1E1E1E',
        void: '#0E0E0E',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        label: ['10px', { lineHeight: '1', letterSpacing: '3px' }],
      },
    },
  },
  plugins: [],
}

export default config
