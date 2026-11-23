import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { mitSemasi } from '../src/lib/mitSemasi';

const mitKlasoru = join(process.cwd(), 'src/content/mitler');
const mitDosyalari = readdirSync(mitKlasoru).filter((dosya) => dosya.endsWith('.md'));
const mitler = mitDosyalari.map((dosya) => ({
  dosya,
  veri: matter(readFileSync(join(mitKlasoru, dosya), 'utf8')).data,
}));

describe('mitos içerikleri', () => {
  it('en az bir mitos var', () => {
    expect(mitDosyalari.length).toBeGreaterThan(0);
  });

  it('sira değerleri tekrarsız', () => {
    const siralar = mitler.map((mit) => mit.veri.sira);
    expect(new Set(siralar).size).toBe(siralar.length);
  });

  it('dosya adları ASCII slug', () => {
    for (const { dosya } of mitler) {
      expect(dosya).toMatch(/^[a-z0-9-]+\.md$/);
    }
  });

  describe.each(mitler)('$dosya', ({ veri }) => {
    it('şemaya uyuyor', () => {
      const sonuc = mitSemasi.safeParse(veri);
      expect(sonuc.success, JSON.stringify(sonuc.error?.issues)).toBe(true);
    });

    it('8–12 kart, her kart en fazla 40 kelime', () => {
      expect(veri.kartlar.length).toBeGreaterThanOrEqual(8);
      expect(veri.kartlar.length).toBeLessThanOrEqual(12);
      for (const kart of veri.kartlar) {
        expect(kart.metin.trim().split(/\s+/).length, kart.metin).toBeLessThanOrEqual(40);
      }
    });

    it('kategori Tanrılar, Kahramanlar veya Ölümlüler', () => {
      expect(['Tanrılar', 'Kahramanlar', 'Ölümlüler']).toContain(veri.tur);
    });

  });
});
