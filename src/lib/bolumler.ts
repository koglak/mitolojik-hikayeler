export const bolumAnahtarlari = ['kentler', 'tanrilar', 'kahramanlar'] as const;

export type BolumAnahtari = (typeof bolumAnahtarlari)[number];

export interface Bolum {
  ad: string;
  tekil: string;
  aciklama: string;
}

export const bolumler: Record<BolumAnahtari, Bolum> = {
  kentler: {
    ad: 'Antik Kentler',
    tekil: 'Kent',
    aciklama: 'Mitlerin geçtiği, tanrılara tapınakların yapıldığı yerler. Bugün nerede oldukları ve ne kaldığıyla.',
  },
  tanrilar: {
    ad: 'Tanrılar',
    tekil: 'Tanrı',
    aciklama: 'Olimposlular ve yeraltının efendisi. Neyi yönettikleri, nasıl tanındıkları, hangi hikâyelerde karşımıza çıktıkları.',
  },
  kahramanlar: {
    ad: 'Kahramanlar',
    tekil: 'Kahraman',
    aciklama: 'Yarı tanrılar ve ölümlüler. Soyları, yaptıkları ve onları anlatan antik kaynaklar.',
  },
};
