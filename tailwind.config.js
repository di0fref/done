/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
    ],
    theme: {
        fontFamily: {
            // sans: ['Inter var', 'sans-serif'],
            sans: ["Roboto", "Helvetica", "Arial", "sans-serif"]
        },
        extend: {
            fontSize: {
                ss: "0.88em",
                task: "0.93em",
                base: "15px"
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
        require('flowbite/plugin')
    ],
}
