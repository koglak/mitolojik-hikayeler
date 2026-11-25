export const bolumAnahtarlari = ['kentler', 'tanrilar', 'kahramanlar'] as const;

export type BolumAnahtari = (typeof bolumAnahtarlari)[number];

export interface Bolum {
  ad: string;
  yol: string;
  tekil: string;
  aciklama: string;
}

export const bolumler: Record<BolumAnahtari, Bolum> = {
  kentler: {
    ad: 'Antik Kentler',
    yol: 'antik-kentler',
    tekil: 'Kent',
    aciklama: 'Tarihöncesi yerleşimler, mitlerin geçtiği kentler ve antik kutsal alanlar. Bugün nerede oldukları ve ne kaldığıyla.',
  },
  tanrilar: {
    ad: 'Tanrılar',
    yol: 'tanrilar',
    tekil: 'Tanrı',
    aciklama: 'Yunan, Mısır, Mezopotamya ve Anadolu tanrıları. Neyi yönettikleri, nasıl tanındıkları, hangi hikâyelerde karşımıza çıktıkları.',
  },
  kahramanlar: {
    ad: 'Kahramanlar',
    yol: 'kahramanlar',
    tekil: 'Kahraman',
    aciklama: 'Yarı tanrılar ve ölümlüler. Soyları, yaptıkları ve onları anlatan antik kaynaklar.',
  },
};

export const bolumAdresi = (bolum: BolumAnahtari) => `/${bolumler[bolum].yol}/`;

export const kayitAdresi = (bolum: BolumAnahtari, kimlik: string) => `/${bolumler[bolum].yol}/${kimlik}/`;

export const mitAdresi = (kimlik: string) => `/mitler/${kimlik}/`;

export const yoldanBolum = (yol: string) => bolumAnahtarlari.find((bolum) => bolumler[bolum].yol === yol);
