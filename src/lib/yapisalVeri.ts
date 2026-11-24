import type { Muze } from './sanatSemasi';
import { mutlakAdres, siteAdi, siteAdresi, siteKisaAdi, varsayilanPaylasimGorseli } from './site';

type Veri = Record<string, unknown>;

const siteKimligi = `${siteAdresi}/#site`;
const yayinciKimligi = `${siteAdresi}/#yayinci`;

export interface KirintiOgesi {
  ad: string;
  yol: string;
}

export const siteVerisi = (): Veri[] => [
  {
    '@type': 'WebSite',
    '@id': siteKimligi,
    url: mutlakAdres('/'),
    name: siteAdi,
    alternateName: siteKisaAdi,
    inLanguage: 'tr-TR',
    publisher: { '@id': yayinciKimligi },
  },
  {
    '@type': 'Organization',
    '@id': yayinciKimligi,
    name: siteAdi,
    url: mutlakAdres('/'),
    logo: new URL(varsayilanPaylasimGorseli, siteAdresi).href,
  },
];

export const kirintiVerisi = (ogeler: KirintiOgesi[]): Veri => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ ad: siteAdi, yol: '/' }, ...ogeler].map((oge, sira) => ({
    '@type': 'ListItem',
    position: sira + 1,
    name: oge.ad,
    item: mutlakAdres(oge.yol),
  })),
});

export const koleksiyonVerisi = (secenekler: { ad: string; aciklama: string; yol: string; ogeler: KirintiOgesi[] }): Veri => ({
  '@type': 'CollectionPage',
  '@id': `${mutlakAdres(secenekler.yol)}#sayfa`,
  url: mutlakAdres(secenekler.yol),
  name: secenekler.ad,
  description: secenekler.aciklama,
  inLanguage: 'tr-TR',
  isPartOf: { '@id': siteKimligi },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: secenekler.ogeler.length,
    itemListElement: secenekler.ogeler.map((oge, sira) => ({
      '@type': 'ListItem',
      position: sira + 1,
      name: oge.ad,
      url: mutlakAdres(oge.yol),
    })),
  },
});

export interface Konum {
  enlem: number;
  boylam: number;
}

export const konuVerisi = (ad: string, konum?: Konum): Veri =>
  konum
    ? {
        '@type': 'LandmarksOrHistoricalBuildings',
        name: ad,
        geo: { '@type': 'GeoCoordinates', latitude: konum.enlem, longitude: konum.boylam },
      }
    : { '@type': 'Thing', name: ad };

export const makaleVerisi = (secenekler: {
  baslik: string;
  aciklama: string;
  yol: string;
  gorsel: string;
  konu?: Veri;
  bolum?: string;
}): Veri => ({
  '@type': 'Article',
  '@id': `${mutlakAdres(secenekler.yol)}#makale`,
  mainEntityOfPage: mutlakAdres(secenekler.yol),
  headline: secenekler.baslik,
  description: secenekler.aciklama,
  image: new URL(secenekler.gorsel, siteAdresi).href,
  inLanguage: 'tr-TR',
  isPartOf: { '@id': siteKimligi },
  author: { '@id': yayinciKimligi },
  publisher: { '@id': yayinciKimligi },
  ...(secenekler.bolum ? { articleSection: secenekler.bolum } : {}),
  ...(secenekler.konu ? { about: secenekler.konu } : {}),
});

export const sanatEseriVerisi = (secenekler: {
  ad: string;
  aciklama: string;
  yol: string;
  tur: string;
  malzeme: string;
  tarih: string;
  muze: Muze;
  sanatci?: string;
  gorsel?: string;
}): Veri => ({
  '@type': 'VisualArtwork',
  '@id': `${mutlakAdres(secenekler.yol)}#eser`,
  url: mutlakAdres(secenekler.yol),
  name: secenekler.ad,
  description: secenekler.aciklama,
  inLanguage: 'tr-TR',
  artform: secenekler.tur,
  artMedium: secenekler.malzeme,
  temporal: secenekler.tarih,
  contentLocation: {
    '@type': 'Place',
    name: secenekler.muze.ad,
    address: `${secenekler.muze.kent}, ${secenekler.muze.ulke}`,
    geo: { '@type': 'GeoCoordinates', latitude: secenekler.muze.enlem, longitude: secenekler.muze.boylam },
  },
  ...(secenekler.sanatci ? { creditText: secenekler.sanatci } : {}),
  ...(secenekler.gorsel ? { image: new URL(secenekler.gorsel, siteAdresi).href } : {}),
});
