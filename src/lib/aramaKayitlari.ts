import { getCollection } from 'astro:content';
import { bolumAnahtarlari, bolumler, kayitAdresi, mitAdresi } from './bolumler';

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
  return kayitlar;
}
