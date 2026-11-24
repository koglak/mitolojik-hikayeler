import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { mitSemasi } from './lib/mitSemasi';
import { kayitSemasi } from './lib/kayitSemasi';
import { eserSemasi, yazarSemasi } from './lib/kaynakSemasi';
import { sanatSemasi } from './lib/sanatSemasi';

const mitler = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/mitler' }),
  schema: mitSemasi,
});

const kayitKoleksiyonu = (klasor: string) =>
  defineCollection({
    loader: glob({ pattern: '*.md', base: `./src/content/${klasor}` }),
    schema: kayitSemasi,
  });

const yazarlar = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/yazarlar' }),
  schema: yazarSemasi,
});

const eserler = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/eserler' }),
  schema: eserSemasi,
});

const sanat = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sanat' }),
  schema: sanatSemasi,
});

export const collections = {
  mitler,
  kentler: kayitKoleksiyonu('kentler'),
  tanrilar: kayitKoleksiyonu('tanrilar'),
  kahramanlar: kayitKoleksiyonu('kahramanlar'),
  yazarlar,
  eserler,
  sanat,
};
