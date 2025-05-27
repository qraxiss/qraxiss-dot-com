import { h } from 'preact';
import { render as preactRender } from 'preact-render-to-string';
import { createApp } from './base.js';
import { EntryConfig } from './config.js';
import { ThemeProvider } from './app/contexts/theme/Provider.js';

export async function render({ props, url }: EntryConfig) {
  const { component } = createApp({
    url,
    props,
  });

  // Wrap component with required providers for SSR
  const wrappedComponent = h(ThemeProvider, { children: component });

  return { template: preactRender(wrappedComponent) };
}

export default {
  render,
};
