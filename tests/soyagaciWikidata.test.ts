import { describe, expect, it } from 'vitest';
import { soyagaciSorgusu, sonuclariCozumle } from '../scripts/soyagaciWikidata.mjs';

const uri = (q: string) => ({ type: 'uri', value: `http://www.wikidata.org/entity/${q}` });
const etiket = (metin: string) => ({ type: 'literal', value: metin });

describe('soyagaciSorgusu', () => {
  it('tohumları ve ata yolunu içerir', () => {
    const sorgu = soyagaciSorgusu(['Q34201', 'Q122248']);
    expect(sorgu).toContain('wd:Q34201');
    expect(sorgu).toContain('wd:Q122248');
    expect(sorgu).toContain('(wdt:P22|wdt:P25)*');
  });

  it('dört ilişki özelliğini sorar', () => {
    const sorgu = soyagaciSorgusu(['Q34201']);
    for (const ozellik of ['P22', 'P25', 'P26', 'P40']) expect(sorgu).toContain(`wdt:${ozellik}`);
  });

  it('geçersiz Q kimliğini reddeder', () => {
    expect(() => soyagaciSorgusu(['Q1; DROP'])).toThrow();
  });
});

describe('sonuclariCozumle', () => {
  const yanit = {
    results: {
      bindings: [
        { kisi: uri('Q34201'), adEn: etiket('Zeus'), adTr: etiket('Zeus'), ozellik: etiket('P26'), hedef: uri('Q38012') },
        { kisi: uri('Q38012'), adEn: etiket('Hera'), ozellik: etiket('P26'), hedef: uri('Q34201') },
        { kisi: uri('Q34201'), adEn: etiket('Zeus'), ozellik: etiket('P22'), hedef: uri('Q44204') },
        { kisi: uri('Q44204'), adEn: etiket('Cronus'), ozellik: etiket('P40'), hedef: uri('Q34201') },
        { kisi: uri('Q34201'), adEn: etiket('Zeus'), ozellik: etiket('P40'), hedef: uri('Q122248') },
      ],
    },
  };
  const sonuc = sonuclariCozumle(yanit);

  it('Q kimliklerini URI dan ayıklar ve kişileri tekilleştirir', () => {
    expect(sonuc.kisiler.map((k: { wikidata: string }) => k.wikidata).sort()).toEqual(['Q34201', 'Q38012', 'Q44204']);
    expect(sonuc.kisiler.find((k: { wikidata: string }) => k.wikidata === 'Q34201')).toEqual({ wikidata: 'Q34201', adEn: 'Zeus', adTr: 'Zeus' });
  });

  it('iki yönde gelen eşi teke indirir', () => {
    expect(sonuc.iliskiler.filter((i: { tur: string }) => i.tur === 'es')).toEqual([{ tur: 'es', kisiler: ['Q34201', 'Q38012'] }]);
  });

  it('baba ve çocuk ilişkilerini aynı ebeveyn ilişkisinde birleştirir', () => {
    const ebeveynler = sonuc.iliskiler.filter((i: { tur: string }) => i.tur === 'ebeveyn');
    expect(ebeveynler).toContainEqual({ tur: 'ebeveyn', ebeveyn: 'Q44204', cocuk: 'Q34201' });
    expect(ebeveynler).toContainEqual({ tur: 'ebeveyn', ebeveyn: 'Q34201', cocuk: 'Q122248' });
    expect(ebeveynler.length).toBe(2);
  });
});
