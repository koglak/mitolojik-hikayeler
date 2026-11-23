import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';

const eskiKentYonlendirmeleri = Object.fromEntries(
  readdirSync(new URL('./src/content/kentler/', import.meta.url))
    .filter((dosya) => dosya.endsWith('.md'))
    .map((dosya) => dosya.replace(/\.md$/, ''))
    .map((kimlik) => [`/kentler/${kimlik}`, `/antik-kentler/${kimlik}/`]),
);

const yonlendirmeler = {
  '/kentler': '/antik-kentler/',
  ...eskiKentYonlendirmeleri,
};

const kaliciYonlendirmeler = {
  name: 'kalici-yonlendirmeler',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const ayarDosyasi = new URL('staticwebapp.config.json', dir);
      const ayarlar = JSON.parse(readFileSync(ayarDosyasi, 'utf8'));
      const yonlendirmeKurallari = Object.entries(yonlendirmeler).map(([route, redirect]) => ({
        route,
        redirect,
        statusCode: 301,
      }));
      ayarlar.routes = [...yonlendirmeKurallari, ...(ayarlar.routes ?? [])];
      writeFileSync(ayarDosyasi, JSON.stringify(ayarlar));
    },
  },
};

export default defineConfig({
  site: 'https://mitolojikhikayeler.com',
  output: 'static',
  trailingSlash: 'ignore',
  redirects: yonlendirmeler,
  integrations: [kaliciYonlendirmeler],
});
