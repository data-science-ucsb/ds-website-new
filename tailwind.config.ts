import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Data Science UCSB palette, taken from the logo
        navy: {
          DEFAULT: '#273F87',
          deep: '#121C40',
          ink: '#0B1230',
          soft: '#E4E8F4',
        },
        gold: {
          DEFAULT: '#FCD20F',
          soft: '#FFF1A8',
          deep: '#9A7B00', // darker gold that still reads on paper
        },
        paper: {
          DEFAULT: '#F6F4EE',
          card: '#EDEAE1',
          line: '#DDD8CB',
        },
        ink: {
          DEFAULT: '#151A2D',
          muted: '#5B6070',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
        openSans: ['Open Sans', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        display: '-0.035em',
      },
    },
  },
  plugins: [],
}
export default config
