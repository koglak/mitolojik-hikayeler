import { existsSync, readFileSync } from 'node:fs';
import { beforeAll, describe, expect, it } from 'vitest';
import { soyagaciYerlesimi, type Yerlesim, type YerlesikKisi } from '../src/lib/soyagaciYerlesimi';
import type { Soyagaci } from '../src/lib/soyagaciSemasi';
import { ornek } from './soyagaciOrnek';

const cakisiyor = (a: YerlesikKisi, b: YerlesikKisi) =>
  a.x < b.x + b.genislik && b.x < a.x + a.genislik && a.y < b.y + b.yukseklik && b.y < a.y + a.yukseklik;

describe('soyagaciYerlesimi', () => {
  let yerlesim: Yerlesim;
  const konum = (kimlik: string) => yerlesim.kisiler.find((k) => k.kimlik === kimlik)!;

  beforeAll(async () => {
    yerlesim = await soyagaciYerlesimi(ornek);
  });

  it('her kişiye, akrabasızlar dahil, bir konum verir', () => {
    expect(yerlesim.kisiler.map((k) => k.kimlik).sort()).toEqual(ornek.kisiler.map((k) => k.kimlik).sort());
    expect(konum('kybele')).toBeDefined();
  });

  it('kişi kutuları çakışmaz', () => {
    for (const [i, a] of yerlesim.kisiler.entries()) {
      for (const b of yerlesim.kisiler.slice(i + 1)) expect(cakisiyor(a, b), `${a.kimlik} ile ${b.kimlik}`).toBe(false);
    }
  });

  it('çocuk her ana ebeveyninin altında durur', () => {
    for (const iliski of ornek.iliskiler) {
      if (iliski.tur !== 'ebeveyn' || iliski.anlati !== 'ana') continue;
      expect(konum(iliski.cocuk).y, `${iliski.ebeveyn} → ${iliski.cocuk}`).toBeGreaterThan(konum(iliski.ebeveyn).y);
    }
  });

  it('eşler için bir birlik kurar, çocuk ebeveyn birliğinden iner', () => {
    expect(yerlesim.birlikler.find((b) => b.kimlik === 'birlik:hera+zeus')?.ebeveynler).toEqual(['hera', 'zeus']);
    expect(yerlesim.cizgiler.some((c) => c.kimden === 'birlik:alkmene+zeus' && c.kime === 'herakles')).toBe(true);
  });

  it('çizgiler vurgulama için uçlarındaki kişileri taşır', () => {
    const cizgi = yerlesim.cizgiler.find((c) => c.kimden === 'birlik:alkmene+zeus' && c.kime === 'herakles')!;
    expect(cizgi.kisiler.sort()).toEqual(['alkmene', 'herakles', 'zeus']);
    expect(cizgi.noktalar.length).toBeGreaterThanOrEqual(2);
  });

  it('alternatif anlatıyı çizmez', () => {
    expect(yerlesim.cizgiler.some((c) => c.kisiler.includes('khaos') && c.kisiler.includes('eros'))).toBe(false);
  });

  it('kapsayan boyutlar bütün kişileri içerir', () => {
    for (const k of yerlesim.kisiler) {
      expect(k.x + k.genislik).toBeLessThanOrEqual(yerlesim.genislik);
      expect(k.y + k.yukseklik).toBeLessThanOrEqual(yerlesim.yukseklik);
    }
  });
});

const gercekVeri = 'src/data/soyagaci.json';

describe.skipIf(!existsSync(gercekVeri))('gerçek veriyle yerleşim', () => {
  it('10 saniyeden kısa sürer ve herkesi yerleştirir', async () => {
    const veri: Soyagaci = JSON.parse(readFileSync(gercekVeri, 'utf8'));
    const baslangic = performance.now();
    const yerlesim = await soyagaciYerlesimi(veri);
    expect(performance.now() - baslangic).toBeLessThan(10_000);
    expect(yerlesim.kisiler.length).toBe(veri.kisiler.length);
  }, 20_000);
});
