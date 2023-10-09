/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#555555",
        background: "#ffffff",
        foreground: "#3dd44b",
        primary: {
          DEFAULT: "#404543",
          foreground: "#3dd44b",
        }
      }
      
       
        
    },
  },
  plugins: [],
}

