import { describe, expect, it } from 'vitest';
import { aralikYaz, eksenEtiketleri, eksenIsaretleri, gecerliYil, koordinat, yilaCevir, yilKaydir, yilYaz } from '../src/lib/zamanAtlasi/yil';

describe('sıfır yılı', () => {
  it('MÖ 1 ile MS 1 arasında tek adım var', () => {
    expect(koordinat(1) - koordinat(-1)).toBe(1);
  });

  it('koordinat ve yıl birbirine çevrilir', () => {
    for (const yil of [-3500, -2, -1, 1, 2, 500]) expect(yilaCevir(koordinat(yil))).toBe(yil);
  });

  it('kaydırma sıfırı atlar', () => {
    expect(yilKaydir(-1, 1)).toBe(1);
    expect(yilKaydir(1, -1)).toBe(-1);
    expect(yilKaydir(-5, 10)).toBe(6);
  });

  it('kaydırma sınırda durur', () => {
    expect(yilKaydir(-3500, -10)).toBe(-3500);
    expect(yilKaydir(495, 10)).toBe(500);
    expect(yilKaydir(-325, 10, -550, -323)).toBe(-323);
  });

  it('sıfır, kesir, sayı olmayan ve aralık dışı yıl geçersiz', () => {
    for (const deger of [0, 1.5, Number.NaN, -3501, 501]) expect(gecerliYil(deger)).toBe(false);
    for (const deger of [-3500, -1, 1, 500]) expect(gecerliYil(deger)).toBe(true);
  });
});

describe('yıl yazımı', () => {
  it('tek yıl', () => {
    expect(yilYaz(-1274)).toBe('MÖ 1274');
    expect(yilYaz(72)).toBe('MS 72');
  });

  it('aralık, aynı çağda öneki tekrarlamaz', () => {
    expect(aralikYaz(-1279, -1213)).toBe('MÖ 1279–1213');
    expect(aralikYaz(38, 72)).toBe('MS 38–72');
    expect(aralikYaz(-27, 14)).toBe('MÖ 27 – MS 14');
    expect(aralikYaz(-490, -490)).toBe('MÖ 490');
  });
});

describe('eksen', () => {
  it('uçları içerir, sıfırı içermez ve sıralıdır', () => {
    for (const [bas, son] of [[-3500, 500], [-30, 500], [-323, -30], [-1200, -550]]) {
      const isaretler = eksenIsaretleri(bas, son);
      expect(isaretler[0]).toBe(bas);
      expect(isaretler.at(-1)).toBe(son);
      expect(isaretler).not.toContain(0);
      expect(isaretler).toEqual([...new Set(isaretler)].sort((a, b) => a - b));
      expect(isaretler.length).toBeLessThanOrEqual(12);
    }
  });

  it('etiketler uç etiketlerin üstüne binmez', () => {
    expect(eksenEtiketleri(-3500, 500)).toEqual([-3500, -2500, -2000, -1500, -1000, -500, 500]);
  });
});
