const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                Hind: ['Hind', 'sans-serif'],
            },
            colors: {
                brand: '#1B998B',
            },
            boxShadow: {
                full: `0px 8px 40px rgba(1, 33, 54, 0.05)`,
            },
        },
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
