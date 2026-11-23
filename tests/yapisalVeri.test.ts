import { describe, expect, it } from 'vitest';
import { kirintiVerisi, konuVerisi, makaleVerisi } from '../src/lib/yapisalVeri';

describe('kirintiVerisi', () => {
  it('ana sayfayla başlar ve sırayla numaralanır', () => {
    const veri = kirintiVerisi([
      { ad: 'Tanrılar', yol: '/tanrilar/' },
      { ad: 'Zeus', yol: '/tanrilar/zeus' },
    ]) as { itemListElement: { position: number; name: string; item: string }[] };
    expect(veri.itemListElement.map((oge) => [oge.position, oge.name, oge.item])).toEqual([
      [1, 'Mitolojik Hikâyeler', 'https://mitolojikhikayeler.com/'],
      [2, 'Tanrılar', 'https://mitolojikhikayeler.com/tanrilar/'],
      [3, 'Zeus', 'https://mitolojikhikayeler.com/tanrilar/zeus/'],
    ]);
  });
});

describe('konuVerisi', () => {
  it('konumu olan kenti coğrafi koordinatla tanımlar', () => {
    expect(konuVerisi('Efes', { enlem: 37.94, boylam: 27.34 })).toMatchObject({
      '@type': 'LandmarksOrHistoricalBuildings',
      geo: { latitude: 37.94, longitude: 27.34 },
    });
  });

  it('konumsuz kayıt genel varlıktır', () => {
    expect(konuVerisi('Zeus')).toEqual({ '@type': 'Thing', name: 'Zeus' });
  });
});

describe('makaleVerisi', () => {
  it('mutlak adres ve görsel üretir', () => {
    expect(
      makaleVerisi({ baslik: 'Narkissos', aciklama: 'Özet', yol: '/mitler/narkissos/', gorsel: '/paylasim/mitler/narkissos.png' }),
    ).toMatchObject({
      '@type': 'Article',
      mainEntityOfPage: 'https://mitolojikhikayeler.com/mitler/narkissos/',
      image: 'https://mitolojikhikayeler.com/paylasim/mitler/narkissos.png',
    });
  });
});
