
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            sm: { max: "767px" },
            md: { min: "768px", max: "991px" },
            lg: { min: "992px", max: "1200px" },
        },
        extend: {
            
        },
    },
    daisyui: {
        themes: [
            {
                sellerTheme: {
                    primary: "#000000",
                    secondary: "#F2F2F2",
                    accent: "#FFFFFF",
                },
            },
        ],
    },
    plugins: [require("daisyui"), require('tailwind-scrollbar')],
};
