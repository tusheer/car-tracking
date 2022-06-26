const colors = require('tailwindcss/colors');

module.exports = {
    extend: {},
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        'dh-green': {
            400: '#A7E521',
            500: '#64c900',
            700: '#01896a',
            800: '#00745a',
        },
        'dh-red': {
            500: '#FF5B43',
        },
        'dh-yellow': {
            500: '#FBBD08',
            600: '#f2b100',
        },
        'dh-gray': {
            800: '#2a2a2a',
            700: '#63636A',
            600: '#9797A0',
            500: '#B8B8BE',
            400: '#ededed',
            300: '#e8e8e8',
            200: '#f2f2f2',
        },
    },
    fontFamily: {
        'dh-SFUIDisplay': 'SFUIDisplay',
    },
};
