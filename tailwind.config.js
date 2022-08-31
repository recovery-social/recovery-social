/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts}'],
  daisyui: {
    themes: [
      {
        auth: {
          primary: "#f38b90",
          secondary: "#6199ff",
          accent: "#FFB400",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
  extend: {
    fontFamily: {
      sans: ["Poppins"],
    },
  }
}
