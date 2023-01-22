const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    mode: 'jit',
    variants: {
        extend: {
            visibility: ["group-hover"],
        },
    },
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
    ],
    theme: {
        fontFamily: {
            sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            // sans: ["Roboto", "Helvetica", "Arial", "sans-serif"]
            // sans: ["apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Apple Color Emoji","Helvetica","Arial","sans-serif"]
            // sans: [
            //     "-apple-system",
            //     "system-ui",
            //     "'Segoe UI'",
            //     "Roboto",
            //     "Noto",
            //     "Oxygen-Sans",
            //     "Ubuntu",
            //     "Cantrell",
            //     "'Helvetica Neue'",
            //     "sans-serif",
            //     "'Apple Color Emoji'",
            //     "'Segoe UI Emoji'",
            //     "'Segoe UI Symbol'"
            // ]
        },
        extend: {
            fontSize: {
                base: "15px",
                md: "0.97em",
            },
            colors: {
                back: "#E3E4E8",
                inp:"#D5DDDF",
                dd: "#F6F6F9",
                check: "#DFEAEE",
                primary: "#4772FA",
                warning: "#E03131",
                hov:"#F6F8FE",
                "light-gray": "#F3F3F3",
                active: 'rgb(71, 114, 250, 0.1)'
            },
            width: {
                '100': '28rem',
                '128': '32rem',
                '90': "19rem"
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('tailwind-scrollbar-hide')
    ],
}
