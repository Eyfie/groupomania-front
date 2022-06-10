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
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
