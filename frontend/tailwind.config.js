/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Metropolis', ...defaultTheme.fontFamily.sans]
      // 'serif': ['ui-serif', 'Georgia',],
      // 'mono': ['ui-monospace', 'SFMono-Regular'],
      // 'display': ['Oswald',],
      // 'body': ['"Open Sans"',],
    },
    extend: {
      backgroundImage: {
        'hero-image': "url('/src/assets/images/banner.jpg')",
        'footer-texture': "url('/img/footer-texture.png')"
      },
      // Colors
      colors: {
        primary: '#3490dc',
        secondary: '#e74c3c',
        background: '#f9fafb',
        text: '#333',
        accent: '#8bc34a',
        muted: '#9b59b6',
        gray: {
          DEFAULT: '#e0e0e0',
          dark: '#333',
          light: 'rgb(243 244 246 / var(--tw-bg-opacity, 1))'
        },
        white: '#ffffff',
        black: '#000000',
        transparent: 'transparent'
      },

      // Typography
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'serif']
      },

      // Spacing
      spacing: {
        8: '2rem',
        16: '4rem',
        24: '6rem',
        32: '8rem'
      },

      // Border Radius
      borderRadius: {
        sm: '.125rem',
        DEFAULT: '.25rem',
        md: '.375rem',
        lg: '.5rem',
        full: '9999px'
      },

      // Sizing
      width: {
        sm: '20rem',
        md: '28rem',
        lg: '36rem'
      },

      // Z-Index
      zIndex: {
        0: 0,
        10: 1000,
        20: 2000,
        30: 3000,
        40: 4000,
        50: 5000
      },

      // Shadows
      boxShadow: {
        sm: '0 4px 6px rgba(0, 0, 0, .1)',
        DEFAULT: '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px rgba(0, 0, 0, .05)',
        md: '0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 15px -3px rgba(0, 0, 0, .05)',
        lg: '0 25px 50px -12px rgba(0, 0, 0, .1), 0 18px 30px -6px rgba(0, 0, 0, .05)'
      },

      // Transitions
      transitionProperty: {
        width: 'width',
        height: 'height',
        'background-color': 'background-color',
        'border-radius': 'border-radius',
        'box-shadow': 'box-shadow'
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, .55, 1)',
        'ease-in': 'cubic-bezier(.42, 0, .58, 1)',
        ease: 'cubic-bezier(.25, .1, .25, 1)',
        linear: 'cubic-bezier(0, 0, 1, 1)'
      },

      // Hover Effects
      hoverEffect: {
        'shadow-lg': 'shadow-lg',
        ring: 'ring',
        'scale-100': 'scale-100'
      },

      // Focus Effects
      focusEffect: {
        'outline-none': 'outline-none',
        'ring-2': 'ring-2',
        'ring-offset-2': 'ring-offset-2'
      }

    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}
