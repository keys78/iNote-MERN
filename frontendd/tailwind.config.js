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
    extend: {
      colors: {
        black: "#000112",
        veryDarkGrey: "#20212C",
        darkGrey: "#2B2C37",
        darkGreyLine: "#3E3F4E",
        mediumGrey: "#828fa3",
        lightGreyLine: "#e4ebfa",
        lightGrey: "#f4f7fd",
        mainPurple: "#635FC7",
        mainPurpleHover: "#A8A4FF",
        mainRed: "#EA5555",
        mainRedHover: "#FF9898",
        modalBackgroundLayer: 'rgba(0, 0, 16, 0.5)',
      },
      letterSpacing: {
        widest: "0.15rem",
      },
      boxShadow: {
        main: "0px 4px 6px rgba(54, 78, 126, 0.101545)",
        secondary: "0px 10px 20px rgba(54, 78, 126, 0.25)",
      },
    },
  },
  plugins: [],
}
