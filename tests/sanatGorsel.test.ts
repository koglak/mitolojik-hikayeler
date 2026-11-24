import { describe, expect, it } from 'vitest';
import matter from 'gray-matter';
import { gorselBilgisi, onBilgiyeYaz } from '../scripts/sanatGorsel.mjs';

const bilgi = (lisans: string, ek = {}) => ({
  mime: 'image/jpeg',
  url: 'https://upload.wikimedia.org/a.jpg',
  width: 4000,
  height: 3000,
  thumburl: 'https://upload.wikimedia.org/1280px-a.jpg?utm_source=x',
  thumbwidth: 1280,
  thumbheight: 960,
  descriptionurl: 'https://commons.wikimedia.org/wiki/File:A.jpg',
  extmetadata: {
    LicenseShortName: { value: lisans },
    LicenseUrl: { value: 'http://creativecommons.org/licenses/by-sa/4.0' },
    Artist: { value: '<a href="//x">Jane\n  &amp; Doe</a>' },
  },
  ...ek,
});

describe('gorselBilgisi', () => {
  it('kabul edilen lisansta atıf bilgisini temizler', () => {
    expect(gorselBilgisi(bilgi('CC BY-SA 4.0'))).toEqual({
      adres: 'https://upload.wikimedia.org/1280px-a.jpg',
      genislik: 1280,
      yukseklik: 960,
      sahibi: 'Jane & Doe',
      lisans: 'CC BY-SA 4.0',
      lisansAdresi: 'https://creativecommons.org/licenses/by-sa/4.0',
      kaynakAdresi: 'https://commons.wikimedia.org/wiki/File:A.jpg',
    });
  });

  it('küçük resim yoksa özgün adresi ve ölçüyü kullanır', () => {
    expect(gorselBilgisi(bilgi('CC0', { thumburl: undefined }))).toMatchObject({
      adres: 'https://upload.wikimedia.org/a.jpg',
      genislik: 4000,
      yukseklik: 3000,
    });
  });

  it('kamu malını Türkçe yazar', () => {
    expect(gorselBilgisi(bilgi('Public domain')).lisans).toBe('Kamu malı');
  });

  it.each(['CC BY-NC 4.0', 'CC BY-ND 2.0', 'GFDL', ''])('%s lisansında durur', (lisans) => {
    expect(() => gorselBilgisi(bilgi(lisans))).toThrow('lisans');
  });

  it('üst veri yoksa durur', () => {
    expect(() => gorselBilgisi({ ...bilgi('CC0'), extmetadata: undefined })).toThrow('lisans');
  });

  it('resim olmayan dosyada durur', () => {
    expect(() => gorselBilgisi(bilgi('CC0', { mime: 'video/webm' }))).toThrow('resim');
  });
});

describe('onBilgiyeYaz', () => {
  const gorsel = {
    adres: 'https://upload.wikimedia.org/a.jpg',
    genislik: 1280,
    yukseklik: 960,
    alt: 'Baş "açık"',
    sahibi: 'Jane: Doe',
    lisans: 'CC0',
    kaynakAdresi: 'https://commons.wikimedia.org/wiki/File:A.jpg',
  };
  const metin = '---\nad: "A"\nilgiliKentler: []\n---\n\n## Anlattığı hikâye\n\n---\n\nson\n';

  it('görsel alanını ekler, gövdeyi korur', () => {
    const sonuc = matter(onBilgiyeYaz(metin, gorsel));
    expect(sonuc.data).toEqual({ ad: 'A', ilgiliKentler: [], gorsel });
    expect(sonuc.content).toBe(matter(metin).content);
  });

  it('ikinci yazımda eskisinin yerine geçer', () => {
    const yeni = { ...gorsel, sahibi: 'Başkası' };
    expect(matter(onBilgiyeYaz(onBilgiyeYaz(metin, gorsel), yeni)).data.gorsel).toEqual(yeni);
  });
});
