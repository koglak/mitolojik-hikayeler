export const bolgeAnahtarlari = ['troas', 'misya', 'aiolis', 'ionya', 'likya'] as const;

export type BolgeAnahtari = (typeof bolgeAnahtarlari)[number];

export interface Bolge {
  ad: string;
  renk: string;
}

export const bolgeler: Record<BolgeAnahtari, Bolge> = {
  troas: { ad: 'Troas', renk: '#f2c14e' },
  misya: { ad: 'Misya', renk: '#c792ea' },
  aiolis: { ad: 'Aiolis', renk: '#6fd08c' },
  ionya: { ad: 'İonya', renk: '#5fb8f0' },
  likya: { ad: 'Likya', renk: '#f07a52' },
};

export const bolgesizKent = { anahtar: 'diger', ad: 'Diğer', renk: '#d9ae75' } as const;
