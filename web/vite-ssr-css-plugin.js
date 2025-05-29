export function ssrCssPlugin() {
  let viteConfig;
  
  return {
    name: 'vite-ssr-css-plugin',
    configResolved(config) {
      viteConfig = config;
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // Inject critical CSS inline to prevent FOUC
        const criticalCss = `
    <style id="ssr-critical-css">
      /* Reset and base styles to prevent FOUC */
      *, *::before, *::after { box-sizing: border-box; }
      body { 
        margin: 0; 
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      #root { min-height: 100vh; }
      
      /* Prevent layout shift while loading */
      [data-ssr-loading] {
        opacity: 0;
        transition: opacity 0.1s;
      }
      [data-ssr-loaded] {
        opacity: 1;
      }
    </style>
    <script>
      // Mark as loaded when styles are ready
      document.documentElement.setAttribute('data-ssr-loading', '');
      window.addEventListener('load', () => {
        requestAnimationFrame(() => {
          document.documentElement.removeAttribute('data-ssr-loading');
          document.documentElement.setAttribute('data-ssr-loaded', '');
        });
      });
    </script>`;
        
        // In production, also add preload links for CSS chunks
        let preloadLinks = '';
        if (viteConfig.command === 'build' && !viteConfig.build.ssr) {
          // This will be populated by Vite's manifest
          preloadLinks = '<!-- CSS preload links injected by build -->';
        }
        
        return html
          .replace('</head>', criticalCss + '\n' + preloadLinks + '\n</head>');
      }
    },
    generateBundle(options, bundle) {
      // During SSR build, ensure CSS imports are included
      if (options.ssr) {
        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (chunk.type === 'chunk' && chunk.isEntry) {
            // Prepend CSS imports to ensure they're loaded
            const cssImports = `
// Import CSS for SSR
import "simplebar-react/dist/simplebar.min.css";
import "./styles/index.css";
`;
            
            if (!chunk.code.includes('simplebar.min.css')) {
              chunk.code = cssImports + chunk.code;
            }
          }
        }
      }
    }
  };
}