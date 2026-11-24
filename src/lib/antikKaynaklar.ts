export const antikKaynaklarAdi = 'Antik Kaynaklar';
export const antikKaynaklarAdresi = '/antik-kaynaklar/';
export const antikKaynaklarAciklamasi =
  'Mitleri, kentleri ve kahramanları bugüne taşıyan yazarlar ile eserleri. Homeros’tan Suda sözlüğüne, kim ne yazdı ve ne kadarı kaldı.';

export const gelenekAnahtarlari = ['yunan', 'roma', 'hristiyan'] as const;
export type GelenekAnahtari = (typeof gelenekAnahtarlari)[number];

export const gelenekler: Record<GelenekAnahtari, string> = {
  yunan: 'Yunan dünyası',
  roma: 'Roma dünyası',
  hristiyan: 'Yahudi ve Hristiyan yazarlar',
};

export const eserTuruAnahtarlari = [
  'epik',
  'siir',
  'tiyatro',
  'mitografi',
  'tarih',
  'cografya',
  'felsefe',
  'hitabet',
  'anlati',
  'mektup',
  'bilim',
  'dil',
  'hukuk',
  'din',
] as const;
export type EserTuruAnahtari = (typeof eserTuruAnahtarlari)[number];

export const eserTurleri: Record<EserTuruAnahtari, string> = {
  epik: 'Destan ve öğretici şiir',
  siir: 'Şiir',
  tiyatro: 'Tragedya ve komedya',
  mitografi: 'Mitoloji derlemesi',
  tarih: 'Tarih ve yaşamöyküsü',
  cografya: 'Coğrafya ve gezi',
  felsefe: 'Felsefe ve düşünce',
  hitabet: 'Söylev ve retorik',
  anlati: 'Roman ve kurmaca anlatı',
  mektup: 'Mektup',
  bilim: 'Bilim, tıp ve teknik',
  dil: 'Dil, edebiyat ve derleme',
  hukuk: 'Hukuk',
  din: 'Din ve teoloji',
};

export const durumAnahtarlari = ['tam', 'kismen', 'fragman'] as const;
export type DurumAnahtari = (typeof durumAnahtarlari)[number];

export const durumlar: Record<DurumAnahtari, string> = {
  tam: 'Metni elimizde',
  kismen: 'Bir bölümü kayıp',
  fragman: 'Parçalar hâlinde',
};

export const kaynakAdresi = (kimlik: string) => `${antikKaynaklarAdresi}${kimlik}/`;
