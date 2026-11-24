import { describe, expect, it } from 'vitest';
import { gorselKokenleri, gorselKumesi, lisansKabul, sanatAdresi, sanatEserAdresi } from '../src/lib/sanat';
import { ilgiliEserler, muzelereGrupla, sanatSuz, yakinlariGrupla } from '../src/lib/sanatSorgu';

describe('lisansKabul', () => {
  it.each(['Public domain', 'CC0', 'CC BY 2.5', 'CC BY-SA 4.0', 'cc by-sa 3.0'])('%s kabul edilir', (lisans) => {
    expect(lisansKabul(lisans)).toBe(true);
  });

  it.each(['CC BY-NC 4.0', 'CC BY-ND 2.0', 'CC BY-NC-SA 4.0', 'Fair use', 'GFDL', ''])('%s reddedilir', (lisans) => {
    expect(lisansKabul(lisans)).toBe(false);
  });
});

describe('adresler', () => {
  it('eserler sanat-eserleri altında', () => {
    expect(sanatAdresi).toBe('/sanat-eserleri/');
    expect(sanatEserAdresi('laokoon')).toBe('/sanat-eserleri/laokoon/');
  });
});

const ogeler = [
  { kimlik: 'laokoon', aranan: 'Laokoon ve Oğulları Vatikan', tur: 'heykel', muze: 'vatikan' },
  { kimlik: 'atina-okulu', aranan: 'Atina Okulu Raffaello', tur: 'fresk', muze: 'vatikan' },
  { kimlik: 'cingene-kizi', aranan: 'Çingene Kızı', tur: 'mozaik', muze: 'zeugma' },
];
const suz = (secim: Partial<Parameters<typeof sanatSuz>[1]>) =>
  sanatSuz(ogeler, { aranan: '', tur: '', muze: '', ...secim }).map((oge) => oge.kimlik);

describe('sanatSuz', () => {
  it('boş seçim bütün eserleri verir', () => {
    expect(suz({})).toEqual(['laokoon', 'atina-okulu', 'cingene-kizi']);
  });

  it('tür ve müze birlikte uygulanır', () => {
    expect(suz({ tur: 'heykel', muze: 'vatikan' })).toEqual(['laokoon']);
  });

  it('eşleşme yoksa boş liste verir', () => {
    expect(suz({ tur: 'mozaik', muze: 'vatikan' })).toEqual([]);
  });

  it.each([
    ['LAOKOON', 'laokoon'],
    ['cingene kizi', 'cingene-kizi'],
    ['  ÇİNGENE ', 'cingene-kizi'],
  ])('%s araması harf farkından etkilenmez', (aranan, beklenen) => {
    expect(suz({ aranan })).toEqual([beklenen]);
  });
});

const eserler = [
  { id: 'laokoon', data: { muze: 'vatikan', ilgiliMitler: ['truva-ati'], ilgiliTanrilar: ['athena'] } },
  { id: 'atina-okulu', data: { muze: 'vatikan', ilgiliMitler: [], ilgiliTanrilar: ['athena'] } },
  { id: 'cingene-kizi', data: { muze: 'zeugma', ilgiliMitler: [], ilgiliTanrilar: [] } },
].map((eser) => ({ ...eser, data: { ...eser.data, ilgiliKahramanlar: [], ilgiliKentler: [] } }));
const muze = (ad: string) => ({ ad, kent: 'Kent', ulke: 'Ülke', enlem: 1, boylam: 2 });

describe('muzelereGrupla', () => {
  it('aynı müzedeki eserleri tek grupta toplar, eseri olmayan müzeyi atlar', () => {
    const gruplar = muzelereGrupla(eserler, { vatikan: muze('Vatikan'), zeugma: muze('Zeugma'), bos: muze('Boş') });
    expect(gruplar.map((grup) => [grup.kimlik, grup.eserler.map((eser) => eser.id)])).toEqual([
      ['vatikan', ['laokoon', 'atina-okulu']],
      ['zeugma', ['cingene-kizi']],
    ]);
  });
});

describe('yakinlariGrupla', () => {
  const noktalar = [
    { ad: 'british-museum', x: 100, y: 100 },
    { ad: 'met', x: 10, y: 120 },
    { ad: 'national-gallery', x: 100.1, y: 100 },
  ];
  const grupla = (uzaklik: number) => yakinlariGrupla(noktalar, uzaklik).map((grup) => grup.map(({ ad }) => ad));

  it('birbirini örten noktaları tek grupta toplar', () => {
    expect(grupla(20)).toEqual([['british-museum', 'national-gallery'], ['met']]);
  });

  it('uzaklık yeterliyse her nokta ayrı kalır', () => {
    expect(grupla(0.05)).toEqual([['british-museum'], ['met'], ['national-gallery']]);
  });
});

describe('ilgiliEserler', () => {
  it('bağı eser dosyasından ters yönde kurar', () => {
    expect(ilgiliEserler(eserler, 'tanrilar', 'athena').map((eser) => eser.id)).toEqual(['laokoon', 'atina-okulu']);
    expect(ilgiliEserler(eserler, 'mitler', 'truva-ati').map((eser) => eser.id)).toEqual(['laokoon']);
    expect(ilgiliEserler(eserler, 'kentler', 'efes')).toEqual([]);
  });
});

describe('gorselKumesi', () => {
  const kok = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab';

  it('küçük resim adresinden daha dar boyutları üretir', () => {
    expect(gorselKumesi({ adres: `${kok}/A.jpg/960px-A.jpg`, genislik: 960 })).toBe(
      `${kok}/A.jpg/330px-A.jpg 330w, ${kok}/A.jpg/500px-A.jpg 500w, ${kok}/A.jpg/960px-A.jpg 960w`,
    );
  });

  it('adında piksel geçen ve TIFF kaynaklı dosyada yalnızca boyutu değiştirir', () => {
    const adres = `${kok}/20px-B.tif/lossy-page1-500px-20px-B.tif.jpg`;
    expect(gorselKumesi({ adres, genislik: 500 })).toBe(
      `${kok}/20px-B.tif/lossy-page1-330px-20px-B.tif.jpg 330w, ${adres} 500w`,
    );
  });

  it('thumb.wikimedia.org adresini de tanır', () => {
    const thumb = kok.replace('upload', 'thumb');
    expect(gorselKumesi({ adres: `${thumb}/A.jpg/500px-A.jpg`, genislik: 500 })).toBe(
      `${thumb}/A.jpg/330px-A.jpg 330w, ${thumb}/A.jpg/500px-A.jpg 500w`,
    );
  });

  it('özgün dosya adresinden küçük resim adresleri türetir', () => {
    const adres = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/A%2C_b.JPG';
    const kucuk = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/A%2C_b.JPG';
    expect(gorselKumesi({ adres, genislik: 800 })).toBe(
      `${kucuk}/330px-A%2C_b.JPG 330w, ${kucuk}/500px-A%2C_b.JPG 500w, ${adres} 800w`,
    );
  });

  it('küçük resmi başka uzantıyla üretilen özgün dosyada küme üretmez', () => {
    expect(gorselKumesi({ adres: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/A.tif', genislik: 800 })).toBeUndefined();
  });
});

describe('gorselKokenleri', () => {
  it('görsellerin sunucu kökenlerini yinelemeden verir', () => {
    expect(
      gorselKokenleri([
        { data: { gorsel: { adres: 'https://thumb.wikimedia.org/a/A.jpg', genislik: 800 } } },
        { data: { gorsel: { adres: 'https://thumb.wikimedia.org/b/B.jpg', genislik: 800 } } },
        { data: { gorsel: { adres: 'https://upload.wikimedia.org/c/C.jpg', genislik: 800 } } },
      ]),
    ).toEqual(['https://thumb.wikimedia.org', 'https://upload.wikimedia.org']);
  });

  it('özgün dosyanın küçük resim sunucusunu da katar', () => {
    const adres = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/A.jpg';
    expect(gorselKokenleri([{ data: { gorsel: { adres, genislik: 800 } } }])).toEqual([
      'https://thumb.wikimedia.org',
      'https://upload.wikimedia.org',
    ]);
  });

  it('görseli olmayan eseri atlar', () => {
    expect(gorselKokenleri([{ data: {} }])).toEqual([]);
  });
});
