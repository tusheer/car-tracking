const colors = require('tailwindcss/colors');

module.exports = {
    extend: {},
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        'ct-purple': {
            800: '#8A39E1',
            700: '#9C51E0',
            400: '#B667F1',
        },
        'ct-red': {
            500: '#FF5B43',
        },
        'ct-yellow': {
            500: '#FBBD08',
            600: '#f2b100',
        },
        'ct-gray': {
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
