import { describe, expect, it } from 'vitest';
import { gorselTuru } from '../src/lib/site';
import { kirintiVerisi, konuVerisi, makaleVerisi, sanatEseriVerisi } from '../src/lib/yapisalVeri';

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

describe('sanatEseriVerisi', () => {
  const temel = {
    ad: 'Laokoon ve Oğulları',
    aciklama: 'Özet',
    yol: '/sanat-eserleri/laokoon',
    tur: 'Heykel',
    malzeme: 'Mermer',
    tarih: 'MÖ 1. yüzyıl',
    muze: { ad: 'Vatikan Müzeleri', kent: 'Vatikan', ulke: 'Vatikan', enlem: 41.9, boylam: 12.45 },
  };

  it('eseri bulunduğu müzeyle tanımlar', () => {
    expect(sanatEseriVerisi({ ...temel, gorsel: '/paylasim/sanat/laokoon.jpg' })).toMatchObject({
      '@type': 'VisualArtwork',
      url: 'https://mitolojikhikayeler.com/sanat-eserleri/laokoon/',
      image: 'https://mitolojikhikayeler.com/paylasim/sanat/laokoon.jpg',
      artMedium: 'Mermer',
      contentLocation: { '@type': 'Place', name: 'Vatikan Müzeleri', geo: { latitude: 41.9, longitude: 12.45 } },
    });
  });

  it('görseli olmayan eserde image alanı yoktur', () => {
    expect(sanatEseriVerisi(temel)).not.toHaveProperty('image');
  });
});

describe('gorselTuru', () => {
  it('uzantıdan içerik türünü verir', () => {
    expect(gorselTuru('/paylasim/sanat/laokoon.jpg')).toBe('image/jpeg');
    expect(gorselTuru('/paylasim/site.png')).toBe('image/png');
  });
});
