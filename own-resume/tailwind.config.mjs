/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#16a085",
          secondary: "#1abc9c",
        },
      },
    },
    plugins: [],
  }