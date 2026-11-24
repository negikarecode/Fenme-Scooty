/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF9F6',
          100: '#F5F3ED',
          200: '#ECE8DF',
        },
        blush: {
          50: '#FFF5F7',
          100: '#FDF0F3',
          200: '#FADADD',
          300: '#F7C6D0',
          400: '#F09CB3',
          500: '#E05D84',
          600: '#BE3A64',
          700: '#942648',
          800: '#681931',
          900: '#3D0A1B',
        },
        slateBlue: {
          50: '#F4F7FB',
          100: '#DCE8F5',
          200: '#B8D1EB',
          300: '#8FB5DE',
          400: '#5A8CC9',
          500: '#2B4C7E',
          600: '#223D66',
          700: '#1A2E4D',
          800: '#132137',
          900: '#0C1523',
        },
        sky: {
          50: '#F5FAFE',
          100: '#EBF4FA',
          200: '#CFE7F5',
          300: '#ADD7EE',
          400: '#79BCE1',
          500: '#469DD2',
        },
        sage: {
          50: '#F4F8EE',
          100: '#E7F2D7',
          200: '#DCEAC5',
          300: '#B8D08B',
          400: '#9EBE67',
          500: '#7F9E4B',
          700: '#4E6532',
          900: '#2A3A17',
        },
        charcoal: {
          DEFAULT: '#1E1E24',
          muted: '#3D3D48',
          light: '#656574',
          border: '#282830',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(30, 30, 36, 0.06)',
        'elevated': '0 12px 32px -4px rgba(30, 30, 36, 0.1)',
        'editorial': '3px 3px 0px 0px #1E1E24',
        'editorial-pink': '3px 3px 0px 0px #F7C6D0',
      }
    },
  },
  plugins: [],
}
