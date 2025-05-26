import { render as preactRender } from 'preact-render-to-string';
import { createApp } from './base.js';
import { EntryConfig } from './config.js';

export async function render({ props, url }: EntryConfig) {
  const { component } = createApp({
    url,
    props,
  });

  return { template: preactRender(component) };
}

export default {
  render,
};
