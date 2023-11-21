import type { Config } from 'tailwindcss'

const config: Config = {
    content: ["./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'mulish': ['Mulish', 'sans-serif']
            }
        },
    },
    plugins: [],
    prefix: 'mngo-'
}

export default config;
