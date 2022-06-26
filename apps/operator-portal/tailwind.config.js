const theme = require("tailwind-config/theme.ts")

module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/*.{js,ts,jsx,tsx}',],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        ...theme

    },
    variants: {
        extend: {},
    },
};
