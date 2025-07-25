/* tailwind.config.cjs */
const path = require("path");

module.exports = {
  content: [
    path.join(__dirname, "./src/**/*.{js,ts,cjs,mjs,tjs,jsx,tsx}"),
    path.join("libraries/**/src/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
