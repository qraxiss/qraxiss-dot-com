import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { preact } from '@preact/preset-vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [{
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(/(src|href)="\/(?!web\/)(images|assets)/g, '$1="/web/$2'); // CHANGE !!
    }
  }, preact(), svgr(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/Users/qraxiss/Documents/GitHub/qraxiss-dot-com/apps/api/web",
    },
  },
  base: "/web",
  root: "./web"
});
