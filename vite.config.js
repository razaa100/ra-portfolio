import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwind() // enable Tailwind v4 Vite plugin
  ],
  base: '/ra-portfolio/' // <-- top-level, NOT inside plugins
});
