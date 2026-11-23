import { readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';

const eskiKentYonlendirmeleri = Object.fromEntries(
  readdirSync(new URL('./src/content/kentler/', import.meta.url))
    .filter((dosya) => dosya.endsWith('.md'))
    .map((dosya) => dosya.replace(/\.md$/, ''))
    .map((kimlik) => [`/kentler/${kimlik}`, `/antik-kentler/${kimlik}`]),
);

export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  redirects: {
    '/kentler': '/antik-kentler/',
    ...eskiKentYonlendirmeleri,
  },
});
