import { h } from 'preact';
import { render as preactRender } from 'preact-render-to-string';
import { createApp } from './base.js';
import { EntryConfig } from './config.js';
import { ThemeProvider } from './app/contexts/theme/Provider.js';
import { LocaleProvider } from './app/contexts/locale/Provider.js';
import { BreakpointProvider } from './app/contexts/breakpoint/Provider.js';
import { SidebarProvider } from './app/contexts/sidebar/Provider.js';

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
