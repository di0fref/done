import React, {useEffect, useState} from "react";
import {FaMoon, FaSun} from "react-icons/fa";

function ThemeSwitcher() {
    const [theme, setTheme] = useState("")

    useEffect(() => {
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
        }

        const themeToggleBtn = document.getElementById('theme-toggle');

        themeToggleBtn.addEventListener('click', function () {
            // toggle icons inside button
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            // if set via local storage previously
            if (localStorage.getItem('theme')) {
                if (localStorage.getItem('theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }

                // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }
            }

        });

    }, [theme])

    return (
        <button
            data-tip={"Switch theme"}
            id="theme-toggle"
            type="button"
            className="absolute top-2 right-3 text-zinc-400 focus:outline-none rounded-lg text-sm ">
            <FaSun className="w-4 h-4 hidden hover:text-yellow-400" id="theme-toggle-light-icon"/>
            <FaMoon className="w-4 h-4 hidden hover:text-zinc-700" id="theme-toggle-dark-icon"/>

        </button>
    )
}

export default ThemeSwitcher
