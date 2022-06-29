// eslint-disable-next-line @typescript-eslint/no-var-requires
const theme = require("tailwind-config/theme.ts")

module.exports = {
    mode: 'jit',
    content: ['./*.{js,ts,jsx,tsx}'],
    theme: {
        ...theme

    },
    variants: {
        extend: {},
    },
};
