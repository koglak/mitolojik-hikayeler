import { getCollection, type CollectionEntry } from 'astro:content';
import { kaynakAdresi } from './antikKaynaklar';
import { bolumAnahtarlari, type BolumAnahtari } from './bolumler';
import { kaynagiParcala, type KaynakEseri, type KaynakYazari } from './kaynakEslestir';

export interface AtifYapanKayit {
  bolum: BolumAnahtari;
  kayit: CollectionEntry<BolumAnahtari>;
}

const parantezsiz = (ad: string) => ad.replace(/\s*\([^)]*\)/g, '');

export const yazarlariGetir = async () =>
  (await getCollection('yazarlar')).sort((a, b) => a.data.siralamaYili - b.data.siralamaYili || a.data.ad.localeCompare(b.data.ad, 'tr'));

export const eserleriGetir = async () =>
  (await getCollection('eserler')).sort((a, b) => a.data.yazar.localeCompare(b.data.yazar) || a.data.sira - b.data.sira);

async function adlariTopla(): Promise<{ yazarlar: KaynakYazari[]; eserler: KaynakEseri[] }> {
  const [yazarlar, eserler] = await Promise.all([yazarlariGetir(), eserleriGetir()]);
  return {
    yazarlar: yazarlar.map(({ id, data }) => ({ kimlik: id, adlar: [data.ad, ...data.digerAdlar] })),
    eserler: eserler.map(({ id, data }) => ({
      kimlik: id,
      yazar: data.yazar,
      adlar: [...new Set([data.ad, parantezsiz(data.ad), data.ozgunAd, ...data.digerAdlar, ...data.atifAdlari])],
    })),
  };
}

export async function bagliKaynak(kaynak: string) {
  const { yazarlar, eserler } = await adlariTopla();
  return kaynagiParcala(kaynak, yazarlar, eserler).parcalar.map(({ metin, hedef }) => ({
    metin,
    adres: hedef ? kaynakAdresi(hedef) : undefined,
  }));
}

export async function atifDizini(): Promise<Map<string, AtifYapanKayit[]>> {
  const { yazarlar, eserler } = await adlariTopla();
  const dizin = new Map<string, AtifYapanKayit[]>();
  for (const bolum of bolumAnahtarlari) {
    const kayitlar = (await getCollection(bolum)).sort((a, b) => a.data.sira - b.data.sira);
    for (const kayit of kayitlar) {
      const anilan = kaynagiParcala(kayit.data.kaynak, yazarlar, eserler);
      for (const kimlik of [...anilan.yazarlar, ...anilan.eserler]) {
        dizin.set(kimlik, [...(dizin.get(kimlik) ?? []), { bolum, kayit }]);
      }
    }
  }
  return dizin;
}
