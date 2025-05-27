import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { join } from "path";
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
  root: "./web",
  ssr: {
    noExternal: ['react-syntax-highlighter'],
    external: ['quill-magic-url', 'quill']
  },
  optimizeDeps: {
    include: ['react-syntax-highlighter'],
    exclude: ['quill-magic-url', 'quill']
  }
});

