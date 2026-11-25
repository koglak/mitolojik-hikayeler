export const bolgeAnahtarlari = [
  'prehistorya',
  'attika',
  'peloponnesos',
  'orta-yunanistan',
  'kuzey-yunanistan',
  'adalar',
  'girit',
  'kibris',
  'kuzey-karadeniz',
  'trakya',
  'bithynia',
  'paflagonya',
  'troas',
  'misya',
  'aiolis',
  'lidya',
  'ionya',
  'karya',
  'frigya',
  'pisidia',
  'likya',
  'pamfilya',
  'kilikya',
  'likaonia',
  'kapadokya',
  'hitit',
  'kommagene',
  'suriye',
  'mezopotamya',
  'armenia',
] as const;

export type BolgeAnahtari = (typeof bolgeAnahtarlari)[number];

export interface Bolge {
  ad: string;
  renk: string;
}

export const bolgeler: Record<BolgeAnahtari, Bolge> = {
  prehistorya: { ad: 'Prehistorya', renk: '#e5bd87' },
  attika: { ad: 'Attika', renk: '#00e5ff' },
  peloponnesos: { ad: 'Peloponnesos', renk: '#00bfa5' },
  'orta-yunanistan': { ad: 'Orta Yunanistan', renk: '#448aff' },
  'kuzey-yunanistan': { ad: 'Kuzey Yunanistan', renk: '#b2ff59' },
  adalar: { ad: 'Yunan Adaları', renk: '#ff80ab' },
  girit: { ad: 'Girit', renk: '#ffab40' },
  kibris: { ad: 'Kıbrıs', renk: '#ffd600' },
  'kuzey-karadeniz': { ad: 'Kuzey Karadeniz', renk: '#9575cd' },
  trakya: { ad: 'Trakya', renk: '#90a4ae' },
  bithynia: { ad: 'Bithynia', renk: '#3d5afe' },
  paflagonya: { ad: 'Paflagonya', renk: '#a5d6a7' },
  troas: { ad: 'Troas', renk: '#f2c14e' },
  misya: { ad: 'Misya', renk: '#c792ea' },
  aiolis: { ad: 'Aiolis', renk: '#6fd08c' },
  lidya: { ad: 'Lydia', renk: '#f3eee2' },
  ionya: { ad: 'İonya', renk: '#5fb8f0' },
  karya: { ad: 'Karya', renk: '#4fd8c8' },
  frigya: { ad: 'Frigya', renk: '#e0405e' },
  pisidia: { ad: 'Pisidia', renk: '#c6e04f' },
  likya: { ad: 'Likya', renk: '#f07a52' },
  pamfilya: { ad: 'Pamfilya', renk: '#f48fb1' },
  kilikya: { ad: 'Kilikya', renk: '#8c9eff' },
  likaonia: { ad: 'Likaonia', renk: '#ffcc80' },
  kapadokya: { ad: 'Kapadokya', renk: '#d7a86e' },
  hitit: { ad: 'Hitit Ülkesi', renk: '#e040fb' },
  kommagene: { ad: 'Kommagene', renk: '#ff9100' },
  suriye: { ad: 'Suriye', renk: '#7cb342' },
  mezopotamya: { ad: 'Mezopotamya', renk: '#b39b8e' },
  armenia: { ad: 'Armenia', renk: '#ef9a9a' },
};

export const bolgesizKent = { anahtar: 'diger', ad: 'Diğer', renk: '#d9ae75' } as const;
