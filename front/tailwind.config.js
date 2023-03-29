/* eslint-disable prettier/prettier */
/* @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1CD6C9',
        dprimary: '#13ADA2',
        base: '#F8FAFC',
        negative: '#D4D4D4',
        gain: '#FF5454',
        lose: '#556BD5',
        input: '#EDEEFF',
        // 메달 색깔
        gold: '#EBD516',
        silver: '#A7A7A7',
        bronze: '#948150',
        // 온라인
        online: '#05FF00',
        busy: '#00D1FF',
      },
      backgroundImage: {},
    },
    fontFamily: {
      spoq: ['Spoqa Han Sans Neo', 'sans-serif'],
      ibm: ['IBM-Plex-Mono', 'sans-serif'],
    },
  },
  plugins: [],
});
