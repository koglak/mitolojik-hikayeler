import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { sahneYolu } from '../src/lib/sahneYolu';

const sahneKlasoru = join(process.cwd(), 'src/sahneler');
const mitKlasoru = join(process.cwd(), 'src/content/mitler');

const cizilenMitler: string[] = ['prometheus'];

function kartSayisi(slug: string): number {
  return matter(readFileSync(join(mitKlasoru, `${slug}.md`), 'utf8')).data.kartlar.length;
}

function astroDosyalari(klasor: string): string[] {
  if (!existsSync(klasor)) return [];
  return readdirSync(klasor, { withFileTypes: true }).flatMap((girdi) => {
    const yol = join(klasor, girdi.name);
    if (girdi.isDirectory()) return astroDosyalari(yol);
    return girdi.name.endsWith('.astro') ? [yol] : [];
  });
}

describe('sahneYolu', () => {
  it('glob anahtarını üretir', () => {
    expect(sahneYolu('prometheus', 3)).toBe('/src/sahneler/prometheus/3.astro');
  });
});

describe.each(cizilenMitler)('%s sahneleri', (slug) => {
  it('kapak ve her kart için tam bir sahne dosyası var', () => {
    const beklenen = Array.from({ length: kartSayisi(slug) + 1 }, (_, numara) => `${numara}.astro`);
    const mevcut = readdirSync(join(sahneKlasoru, slug)).filter((ad) => /^\d+\.astro$/.test(ad));
    expect(mevcut.sort()).toEqual(beklenen.sort());
  });
});

describe('svg kimlikleri', () => {
  it('sahneye özel kimlikler slug-numara önekli', () => {
    for (const dosya of astroDosyalari(sahneKlasoru)) {
      const icerik = readFileSync(dosya, 'utf8');
      for (const [, kimlik] of icerik.matchAll(/\sid="([^"{]+)"/g)) {
        expect(kimlik, dosya).toMatch(/^[a-z0-9-]+-\d+-/);
      }
    }
  });
});
