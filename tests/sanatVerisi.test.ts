import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import muzeler from '../src/data/muzeler.json';
import { sanatTuruAnahtarlari } from '../src/lib/sanat';
import { muzeSemasi, sanatSemasi } from '../src/lib/sanatSemasi';
import { baglantiAlanlari } from '../src/lib/sanatSorgu';

const icerik = join(process.cwd(), 'src/content');
const klasor = join(icerik, 'sanat');
const eserler = readdirSync(klasor)
  .filter((ad) => ad.endsWith('.md'))
  .map((dosya) => {
    const { data, content } = matter(readFileSync(join(klasor, dosya), 'utf8'));
    return { dosya, kimlik: dosya.replace(/\.md$/, ''), veri: data, govde: content };
  });

describe('sanat eserleri', () => {
  it('ilk partide 40 eser var', () => {
    expect(eserler.length).toBeGreaterThanOrEqual(40);
  });

  it('sira değerleri ve adlar tekrarsız', () => {
    expect(new Set(eserler.map((eser) => eser.veri.sira)).size).toBe(eserler.length);
    expect(new Set(eserler.map((eser) => eser.veri.ad)).size).toBe(eserler.length);
  });

  it('her türden en az bir eser var', () => {
    expect(new Set(eserler.map((eser) => eser.veri.tur))).toEqual(new Set(sanatTuruAnahtarlari));
  });

  it.each(eserler.map((eser) => [eser.dosya, eser] as const))('%s şemaya uyuyor ve bağlantıları geçerli', (_, eser) => {
    expect(eser.dosya).toMatch(/^[a-z0-9-]+\.md$/);
    const sonuc = sanatSemasi.safeParse(eser.veri);
    expect(sonuc.success, JSON.stringify(sonuc.error?.issues)).toBe(true);
    expect(Object.keys(muzeler)).toContain(eser.veri.muze);
    for (const [bolum, alan] of Object.entries(baglantiAlanlari)) {
      for (const kimlik of eser.veri[alan] ?? []) {
        expect(existsSync(join(icerik, bolum, `${kimlik}.md`)), `${bolum}/${kimlik}`).toBe(true);
      }
    }
  });

  it.each(eserler.map((eser) => [eser.dosya, eser] as const))('%s hikâyeyi ve eserin öyküsünü anlatıyor', (_, eser) => {
    const parcalar = eser.govde.trim().split(/^## (.+)$/m);
    expect(parcalar.filter((_, sira) => sira % 2 === 1)).toEqual(['Anlattığı hikâye', 'Eserin öyküsü']);
    expect(parcalar[0]).toBe('');
    expect(parcalar[2].trim().length).toBeGreaterThan(200);
    expect(parcalar[4].trim().length).toBeGreaterThan(200);
  });
});

describe('müzeler', () => {
  it.each(Object.entries(muzeler))('%s şemaya uyuyor ve en az bir eseri var', (kimlik, muze) => {
    expect(kimlik).toMatch(/^[a-z0-9-]+$/);
    expect(muzeSemasi.safeParse(muze).success).toBe(true);
    expect(eserler.some((eser) => eser.veri.muze === kimlik)).toBe(true);
  });
});
