import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      white: '#FFFFFF',
      floral: '#FBFBF2',
      platinum: '#E5E6E4',
      timberwolf: '#CFD2CD',
      silver: '#A6A2A2',
      taupe: '#847577',
      burgundy: {
        100: '#F5DCE0',
        200: '#E5B7C0',
        300: '#D48B9E',
        400: '#C0617C',
        500: '#A53D58',
        600: '#800020', // (default)
        700: '#6A001A',
        800: '#540015',
        900: '#3D000F',
      },
      warning: {
        light: '#ED6E85',
        DEFAULT: '#DA1B3E',
        darker: '#7F1024',
      },
      dark: {
        100: '#5C5C5C',
        200: '#525252',
        300: '#474747',
        400: '#3D3D3D',
        500: '#333333',
        600: '#292929',
        700: '#1F1F1F',
        800: '#141414',
        900: '#0A0A0A',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        light: '0px 0px 12px rgba(255, 255, 255, 1)',
      },
      height: {
        gnb: 'var(--gnb-h)',
        'gnb-md': 'var(--gnb-h-md)',
      },
    },
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      '2xl': '1280px',
      '3xl': '1600px',
    },
    fontSize: {
      sm: '0.75rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2rem',
      '5xl': '2.25rem',
      '6xl': '2.5rem',
      '7xl': '2.75rem',
      '8xl': '3rem',
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.min-w-sm': {
          minWidth: '375px',
        },
      })
    }),
  ],
}
export default config
