/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/preline/dist/*.js/",
    "./index.html",
    "./views/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
