/** @type {import('tailwindcss').Config} */
module.exports = {
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
            // sans: ['Inter var', 'sans-serif'],
            // sans: ["Roboto", "Helvetica", "Arial", "sans-serif"]
            // sans: ["-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Apple Color Emoji","Helvetica","Arial","sans-serif"]
            sans: [
                "-apple-system",
                "system-ui",
                "'Segoe UI'",
                "Roboto",
                "Noto",
                "Oxygen-Sans",
                "Ubuntu",
                "Cantrell",
                "'Helvetica Neue'",
                "sans-serif",
                "'Apple Color Emoji'",
                "'Segoe UI Emoji'",
                "'Segoe UI Symbol'"
            ]
        },
        extend: {
            fontSize: {
                // ss: "0.88em",
                // task: "0.93em",
                // base: "1px",
                // project: "0.90em",
                // s2: "0.83em"
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
