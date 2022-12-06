/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    "grid",
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
    "grid-cols-8",
    "grid-cols-9",
    "grid-cols-10",
    "grid-cols-11",
    "grid-cols-12"
  ],
  theme: {
    fontFamily: {
      sans: ["Mulish", "sans-serif"],
      serif: ["Lora", "serif"],
      body: ["Mulish", "sans-serif"],
      title: ["Lora", "serif"]
    },
    extend: {
      colors: {
        primary: "#0093ff",
        secondary: "#4d4d4d",
        tertiary: "#c9c9c9"
      }
    }
  },
  plugins: []
};
