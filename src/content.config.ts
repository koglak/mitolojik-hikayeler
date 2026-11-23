import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { mitSemasi } from './lib/mitSemasi';
import { kayitSemasi } from './lib/kayitSemasi';

const mitler = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/mitler' }),
  schema: mitSemasi,
});

const kayitKoleksiyonu = (klasor: string) =>
  defineCollection({
    loader: glob({ pattern: '*.md', base: `./src/content/${klasor}` }),
    schema: kayitSemasi,
  });

export const collections = {
  mitler,
  kentler: kayitKoleksiyonu('kentler'),
  tanrilar: kayitKoleksiyonu('tanrilar'),
  kahramanlar: kayitKoleksiyonu('kahramanlar'),
};
