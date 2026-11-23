import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { kontrastOrani } from '../src/lib/kontrast';

const css = readFileSync(join(process.cwd(), 'src/styles/tema.css'), 'utf8');
const kokBlogu = css.match(/:root\s*{([^}]*)}/)?.[1] ?? '';
const tokenlar = Object.fromEntries(
  Array.from(kokBlogu.matchAll(/(--[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g), ([, ad, deger]) => [ad, deger.toLowerCase()]),
);

describe('gece tapınağı teması', () => {
  it('ana renkler tasarım dosyasıyla aynı', () => {
    expect(tokenlar['--zemin']).toBe('#10151c');
    expect(tokenlar['--yuzey']).toBe('#19202a');
    expect(tokenlar['--yuzey-2']).toBe('#202834');
    expect(tokenlar['--yazi']).toBe('#f0e6d6');
    expect(tokenlar['--soluk']).toBe('#aaa9a4');
    expect(tokenlar['--vurgu']).toBe('#d9ae75');
    expect(tokenlar['--hero']).toBe('#111821');
  });

  it('metin renkleri zeminde ve yüzeyde en az 4.5 kontrastlı', () => {
    for (const ad of ['--yazi', '--soluk', '--vurgu', '--dogru', '--yanlis']) {
      expect(kontrastOrani(tokenlar[ad], tokenlar['--zemin']), ad).toBeGreaterThanOrEqual(4.5);
      expect(kontrastOrani(tokenlar[ad], tokenlar['--yuzey']), ad).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('başlık ve gövde fontları tasarımdaki gibi', () => {
    expect(css).toMatch(/--baslik-font:\s*'Cormorant Garamond'/);
    expect(css).toMatch(/--govde-font:\s*'DM Sans'/);
  });

  it('tek tema: renk şeması sorgusu yok', () => {
    expect(css).not.toMatch(/prefers-color-scheme/);
  });

  it('mitos içeriklerinde renk alanı yok', () => {
    const klasor = join(process.cwd(), 'src/content/mitler');
    for (const dosya of readdirSync(klasor).filter((ad) => ad.endsWith('.md'))) {
      const veri = matter(readFileSync(join(klasor, dosya), 'utf8')).data;
      expect(veri, dosya).not.toHaveProperty('renk');
    }
  });
});
