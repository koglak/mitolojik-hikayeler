import { getCollection, type CollectionEntry } from 'astro:content';
import { bolumAnahtarlari, type BolumAnahtari } from './bolumler';

const iliskiAlanlari = {
  kentler: 'ilgiliKentler',
  tanrilar: 'ilgiliTanrilar',
  kahramanlar: 'ilgiliKahramanlar',
} as const satisfies Record<BolumAnahtari, string>;

type KayitGirdisi = CollectionEntry<BolumAnahtari>;

export interface IlgiliGrup {
  bolum: BolumAnahtari;
  kayitlar: KayitGirdisi[];
}

export async function ilgiliKayitlar(bolum: BolumAnahtari, kimlik: string): Promise<IlgiliGrup[]> {
  const koleksiyonlar = await Promise.all(
    bolumAnahtarlari.map(async (anahtar) => [anahtar, await getCollection(anahtar)] as const),
  );
  const kendisi = koleksiyonlar.find(([anahtar]) => anahtar === bolum)?.[1].find((kayit) => kayit.id === kimlik);
  if (!kendisi) return [];

  return koleksiyonlar
    .map(([hedefBolum, kayitlar]) => {
      const ileriBaglar = new Set<string>(kendisi.data[iliskiAlanlari[hedefBolum]]);
      const bagliKayitlar = kayitlar
        .filter(
          (aday) =>
            !(hedefBolum === bolum && aday.id === kimlik) &&
            (ileriBaglar.has(aday.id) || aday.data[iliskiAlanlari[bolum]].includes(kimlik)),
        )
        .sort((a, b) => a.data.sira - b.data.sira);
      return { bolum: hedefBolum, kayitlar: bagliKayitlar };
    })
    .filter((grup) => grup.kayitlar.length > 0 && !(bolum === 'kentler' && grup.bolum === 'kentler'));
}
