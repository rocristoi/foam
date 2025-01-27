/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Update with your file paths
  theme: {
    extend: {
      fontFamily: {
        custom: ['horizon', 'horizon'], // Add your custom font family
      },
    },
  },
  plugins: [],
};
