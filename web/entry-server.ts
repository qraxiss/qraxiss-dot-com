import { h } from 'preact';
import { render as originalPreactRender } from 'preact-render-to-string';
import { createApp } from './base.js';
import { EntryConfig } from './config.js';
import { ThemeProvider } from './app/contexts/theme/Provider.js';
import { LocaleProvider } from './app/contexts/locale/Provider.js';
import { BreakpointProvider } from './app/contexts/breakpoint/Provider.js';
import { SidebarProvider } from './app/contexts/sidebar/Provider.js';

// SSR Logger that mimics NestJS Logger format
class SSRLogger {
  private context = 'SSR';

  warn(message: string) {
    const timestamp = new Date().toISOString();
    console.warn(`[Nest] ${process.pid}  - ${timestamp}  WARN [${this.context}] ${message}`);
  }

  error(message: string, error?: any) {
    const timestamp = new Date().toISOString();
    console.error(`[Nest] ${process.pid}  - ${timestamp} ERROR [${this.context}] ${message}`, error || '');
  }
}

const logger = new SSRLogger();

// Custom render function that handles problematic React components
function preactRender(vnode: any): string {
  try {
    return originalPreactRender(vnode);
  } catch (error: any) {
    // If we get the "[object Object] is not a valid HTML tag name" error,
    // return a safe fallback HTML
    if (error.message && error.message.includes('[object Object] is not a valid HTML tag name')) {
      logger.warn('Caught React component rendering error, serving without SSR content');
      return '<!-- SSR error, content will be hydrated on client -->';
    }
    
    // Re-throw other errors
    throw error;
  }
}

// Import CSS synchronously for SSR to ensure styles are collected
import "simplebar-react/dist/simplebar.min.css";
import "./styles/index.css";

export async function render({ props, url }: EntryConfig) {
  const { component } = createApp({
    url,
    props,
  });

  // Wrap component with required providers for SSR
  // Note: Redux and Auth providers are excluded as they need client-side initialization
  const wrappedComponent = h(
    ThemeProvider,
    null,
    h(
      LocaleProvider,
      null,
      h(
        BreakpointProvider,
        null,
        h(
          SidebarProvider,
          null,
          component
        )
      )
    )
  );

  return { template: preactRender(wrappedComponent) };
}

export default {
  render,
};
