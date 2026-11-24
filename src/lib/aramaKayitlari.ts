import { getCollection } from 'astro:content';
import { kaynakAdresi } from './antikKaynaklar';
import { bolumAnahtarlari, bolumler, kayitAdresi, mitAdresi } from './bolumler';
import { eserleriGetir, yazarlariGetir } from './kaynakDizini';

export interface AramaKaydi {
  baslik: string;
  ozet: string;
  bolum: string;
  adres: string;
}

export async function aramaKayitlari(): Promise<AramaKaydi[]> {
  const mitler = (await getCollection('mitler')).sort((a, b) => a.data.sira - b.data.sira);
  const kayitlar: AramaKaydi[] = mitler.map((mit) => ({
    baslik: mit.data.baslik,
    ozet: `${mit.data.ozet} ${mit.data.bugunBag.kelime}`,
    bolum: 'Hikâye',
    adres: mitAdresi(mit.id),
  }));
  for (const bolum of bolumAnahtarlari) {
    const ogeler = (await getCollection(bolum)).sort((a, b) => a.data.sira - b.data.sira);
    for (const oge of ogeler) {
      kayitlar.push({
        baslik: oge.data.ad,
        ozet: oge.data.ozet,
        bolum: bolumler[bolum].tekil,
        adres: kayitAdresi(bolum, oge.id),
      });
    }
  }
  const yazarlar = await yazarlariGetir();
  for (const { id, data } of yazarlar) {
    kayitlar.push({
      baslik: data.ad,
      ozet: [data.ozet, ...data.digerAdlar].join(' '),
      bolum: 'Antik yazar',
      adres: kaynakAdresi(id),
    });
  }
  const yazarAdlari = new Map(yazarlar.map(({ id, data }) => [id, data.ad]));
  for (const { id, data } of await eserleriGetir()) {
    kayitlar.push({
      baslik: data.ad,
      ozet: [yazarAdlari.get(data.yazar), data.ozet, ...data.digerAdlar].join(' '),
      bolum: `Antik eser, ${yazarAdlari.get(data.yazar)}`,
      adres: kaynakAdresi(id),
    });
  }
  return kayitlar;
}
