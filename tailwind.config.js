/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
    ],
    theme: {
        fontFamily: {
            sans: ['Inter var', 'sans-serif'],
        },
        extend: {
            fontSize: {
                ss: "0.92em",
                task: "0.97em"
            },
            colors: {
                s: "#f1f5f9"
            },
            width: {
                '100': '28rem',
                '128': '32rem',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
