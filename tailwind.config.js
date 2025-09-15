/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#00BF63',
        'info-blue': '#3B82F6',
        'warning-orange': '#F97316',
        'critical-red': '#EF4444',
        'neutral-purple': '#8B5CF6',
        'gray-900': '#111827',
        'gray-800': '#1F2937',
        'gray-700': '#374151',
      }
    },
  },
  plugins: [],
}