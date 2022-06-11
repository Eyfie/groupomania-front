module.exports = {
  content: [
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      screens: {
        'mob': '640px',
        'st': '960px',
        'ft': '1024px'
      },
      fontFamily: {
        ibm: ['"IBM Plex Sans"', 'sans-serif'],
        noto: ['"Noto Sans"', 'sans-serif'],
        lato: ['"Lato"', 'sans-serif'],
      },
      colors: {
        grouporange: {
          100: '#FFD7D7',
          900: '#FD2D01',
        },
        groupogris: {
          900: '#4E5166'
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
