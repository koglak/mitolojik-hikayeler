import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { durumlar, eserTurleri, eserTuruAnahtarlari, gelenekAnahtarlari, gelenekler, kaynakAdresi } from '../src/lib/antikKaynaklar';
import { eserSemasi, yazarSemasi } from '../src/lib/kaynakSemasi';

const icerik = join(process.cwd(), 'src/content');
const oku = (yol: string) => {
  const { data, content } = matter(readFileSync(yol, 'utf8'));
  return { veri: data, govde: content.trim() };
};
const yazarlar = readdirSync(join(icerik, 'yazarlar')).map((dosya) => ({
  kimlik: dosya.replace(/\.md$/, ''),
  ...oku(join(icerik, 'yazarlar', dosya)),
}));
const eserler = readdirSync(join(icerik, 'eserler')).flatMap((klasor) =>
  readdirSync(join(icerik, 'eserler', klasor)).map((dosya) => ({
    kimlik: `${klasor}/${dosya.replace(/\.md$/, '')}`,
    klasor,
    ...oku(join(icerik, 'eserler', klasor, dosya)),
  })),
);

describe('yazarlar', () => {
  it.each(yazarlar.map((yazar) => [yazar.kimlik, yazar] as const))('%s şemaya uyuyor ve en az bir eseri var', (kimlik, yazar) => {
    expect(kimlik).toMatch(/^[a-z0-9-]+$/);
    const sonuc = yazarSemasi.safeParse(yazar.veri);
    expect(sonuc.success, JSON.stringify(sonuc.error?.issues)).toBe(true);
    expect(yazar.govde.length).toBeGreaterThan(150);
    expect(existsSync(join(icerik, 'eserler', kimlik))).toBe(true);
  });

  it('adlar tekrarsız', () => {
    const adlar = yazarlar.map((yazar) => yazar.veri.ad);
    expect(new Set(adlar).size).toBe(adlar.length);
  });

  it('her gelenekten yazar var', () => {
    for (const gelenek of gelenekAnahtarlari) {
      expect(gelenekler[gelenek].length).toBeGreaterThan(0);
      expect(yazarlar.some((yazar) => yazar.veri.gelenek === gelenek)).toBe(true);
    }
  });
});

describe('eserler', () => {
  it.each(eserler.map((eser) => [eser.kimlik, eser] as const))('%s şemaya uyuyor ve yazarının klasöründe', (kimlik, eser) => {
    expect(kimlik).toMatch(/^[a-z0-9-]+\/[a-z0-9-]+$/);
    const sonuc = eserSemasi.safeParse(eser.veri);
    expect(sonuc.success, JSON.stringify(sonuc.error?.issues)).toBe(true);
    expect(eser.govde.length).toBeGreaterThan(150);
    expect(eser.veri.yazar).toBe(eser.klasor);
    expect(yazarlar.some((yazar) => yazar.kimlik === eser.veri.yazar)).toBe(true);
    expect(durumlar[eser.veri.durum as keyof typeof durumlar]).toBeDefined();
  });

  it('bir yazarın eserlerinin sırası tekrarsız', () => {
    const siralar = eserler.map((eser) => `${eser.klasor}:${eser.veri.sira}`);
    expect(new Set(siralar).size).toBe(siralar.length);
  });

  it('her türden eser var', () => {
    for (const tur of eserTuruAnahtarlari) {
      expect(eserTurleri[tur].length).toBeGreaterThan(0);
      expect(eserler.some((eser) => eser.veri.tur === tur), tur).toBe(true);
    }
  });
});

describe('kaynak adresleri', () => {
  it('yazar ve eser iç içe adres alır', () => {
    expect(kaynakAdresi('homeros')).toBe('/antik-kaynaklar/homeros/');
    expect(kaynakAdresi('homeros/ilyada')).toBe('/antik-kaynaklar/homeros/ilyada/');
  });
});
