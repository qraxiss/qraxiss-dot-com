import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path, { join } from "path";
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
      "@": join(process.cwd(), "/web"),
    },
  },
  base: "/web",
  root: "./web"
});

