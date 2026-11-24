export const sanatAdi = 'Sanat Eserleri';
export const sanatAdresi = '/sanat-eserleri/';
export const sanatAciklamasi =
  'Mitleri ve antik dünyayı anlatan ünlü heykeller, resimler, kabartmalar ve mozaikler. Ne anlattıkları, nasıl bulundukları ve bugün nerede durdukları.';

export const sanatTuruAnahtarlari = [
  'heykel',
  'resim',
  'kabartma',
  'mimari',
  'mozaik',
  'fresk',
  'vazo',
  'maden',
] as const;
export type SanatTuru = (typeof sanatTuruAnahtarlari)[number];

export const sanatTurleri: Record<SanatTuru, string> = {
  heykel: 'Heykel',
  resim: 'Resim',
  kabartma: 'Kabartma',
  mimari: 'Anıt ve mimari',
  mozaik: 'Mozaik',
  fresk: 'Fresk',
  vazo: 'Vazo',
  maden: 'Maden işi',
};

export const sanatEserAdresi = (kimlik: string) => `${sanatAdresi}${kimlik}/`;

const kabulEdilenLisans = /^(public domain|kamu malı|cc0(\s.*)?|cc by(-sa)?(\s\d(\.\d)?(\s.*)?)?)$/i;

export const lisansKabul = (lisans: string) => kabulEdilenLisans.test(lisans.trim());

const gorselGenislikleri = [330, 500, 960, 1280];

export const gorselKumesi = ({ adres, genislik }: { adres: string; genislik: number }) => {
  const kucukResim = /^(https:\/\/(?:upload|thumb)\.wikimedia\.org\/.+\/thumb\/.+\/(?:(?:lossy-|lossless-)?page\d+-)?)\d+(px-[^/]+)$/.exec(adres);
  if (!kucukResim) return undefined;
  const [, bas, son] = kucukResim;
  return [
    ...gorselGenislikleri.filter((aday) => aday < genislik).map((aday) => `${bas}${aday}${son} ${aday}w`),
    `${adres} ${genislik}w`,
  ].join(', ');
};
