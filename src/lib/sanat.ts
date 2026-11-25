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
  'mekanizma',
  'tablet',
  'lahit',
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
  mekanizma: 'Mekanizma',
  tablet: 'Tablet',
  lahit: 'Lahit',
};

export const sanatEserAdresi = (kimlik: string) => `${sanatAdresi}${kimlik}/`;

const kabulEdilenLisans = /^(public domain|kamu malı|cc0(\s.*)?|cc by(-sa)?(\s\d(\.\d)?(\s.*)?)?)$/i;

export const lisansKabul = (lisans: string) => kabulEdilenLisans.test(lisans.trim());

const gorselGenislikleri = [330, 500, 960, 1280];

const kucukResimKalibi =
  /^(https:\/\/(?:upload|thumb)\.wikimedia\.org\/.+\/thumb\/.+\/(?:(?:lossy-|lossless-)?page\d+-)?)\d+(px-[^/]+)$/;
const ozgunDosyaKalibi =
  /^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f]\/[0-9a-f]{2})\/([^/]+\.(?:jpe?g|png|webp))$/i;

const kucukResimParcalari = (adres: string) => {
  const kucukResim = kucukResimKalibi.exec(adres);
  if (kucukResim) return { bas: kucukResim[1], son: kucukResim[2] };
  const ozgunDosya = ozgunDosyaKalibi.exec(adres);
  if (!ozgunDosya) return undefined;
  const [, klasor, dosya] = ozgunDosya;
  return { bas: `https://thumb.wikimedia.org/wikipedia/commons/thumb/${klasor}/${dosya}/`, son: `px-${dosya}` };
};

export const gorselKumesi = ({ adres, genislik }: { adres: string; genislik: number }) => {
  const parcalar = kucukResimParcalari(adres);
  if (!parcalar) return undefined;
  return [
    ...gorselGenislikleri
      .filter((aday) => aday < genislik)
      .map((aday) => `${parcalar.bas}${aday}${parcalar.son} ${aday}w`),
    `${adres} ${genislik}w`,
  ].join(', ');
};

export const gorselKokenleri = (eserler: { data: { gorsel?: { adres: string; genislik: number } } }[]) => [
  ...new Set(
    eserler.flatMap(({ data: { gorsel } }) =>
      gorsel ? ((gorselKumesi(gorsel) ?? gorsel.adres).match(/https:\/\/[^/]+/g) ?? []) : [],
    ),
  ),
];
