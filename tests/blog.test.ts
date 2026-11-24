import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { okumaSuresi, yaziAdresi } from '../src/lib/blog';
import { yaziSemasi } from '../src/lib/yaziSemasi';

const icerik = join(process.cwd(), 'src/content');
const klasor = join(icerik, 'blog');
const yazilar = readdirSync(klasor).map((dosya) => {
  const { data, content } = matter(readFileSync(join(klasor, dosya), 'utf8'));
  return { dosya, veri: data, govde: content };
});
const baglantiKlasorleri = {
  ilgiliMitler: 'mitler',
  ilgiliTanrilar: 'tanrilar',
  ilgiliKahramanlar: 'kahramanlar',
  ilgiliKentler: 'kentler',
  ilgiliEserler: 'eserler',
};

describe('okumaSuresi', () => {
  it('dakikayı yukarı yuvarlar ve en az 1 verir', () => {
    expect(okumaSuresi('')).toBe(1);
    expect(okumaSuresi('söz '.repeat(180))).toBe(1);
    expect(okumaSuresi('söz '.repeat(181))).toBe(2);
  });
});

describe('blog yazıları', () => {
  it('adres üretir', () => {
    expect(yaziAdresi('altin-esek')).toBe('/blog/altin-esek/');
  });

  it('başlıklar tekrarsız', () => {
    expect(yazilar.length).toBeGreaterThan(0);
    expect(new Set(yazilar.map((yazi) => yazi.veri.baslik)).size).toBe(yazilar.length);
  });

  it.each(yazilar.map((yazi) => [yazi.dosya, yazi] as const))('%s şemaya uyuyor ve bağlantıları geçerli', (dosya, yazi) => {
    expect(dosya).toMatch(/^[a-z0-9-]+\.md$/);
    const sonuc = yaziSemasi.safeParse(yazi.veri);
    expect(sonuc.success, JSON.stringify(sonuc.error?.issues)).toBe(true);
    expect(yazi.govde.trim().length).toBeGreaterThan(500);
    for (const [alan, bolum] of Object.entries(baglantiKlasorleri)) {
      for (const kimlik of yazi.veri[alan] ?? []) {
        expect(existsSync(join(icerik, bolum, `${kimlik}.md`)), `${bolum}/${kimlik}`).toBe(true);
      }
    }
  });
});
