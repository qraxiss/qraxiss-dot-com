import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { fileURLToPath, URL } from 'node:url';
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
  build: {
    rollupOptions: {
      external: [/\.well-known/]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  base: "/web",
  root: "./web",
  ssr: {
    noExternal: ['react-syntax-highlighter']
  },
  optimizeDeps: {
    include: ['react-syntax-highlighter'],
    exclude: ['@fastify/vite']
  },
  server: {
    fs: {
      allow: ['../']
    }
  }
});

