import { getCollection } from 'astro:content';
import { kaynakAdresi } from '../antikKaynaklar';
import { bolumAnahtarlari, bolumler, kayitAdresi, mitAdresi } from '../bolumler';
import type { AtlasKaydi } from './sorgu';

export interface IcerikBaglantisi {
  ad: string;
  tur: string;
  adres: string;
}

export async function baglantiCozucu(): Promise<(kayit: AtlasKaydi['kayit']) => IcerikBaglantisi[]> {
  const dizin = new Map<string, IcerikBaglantisi>();
  for (const { id, data } of await getCollection('mitler')) {
    dizin.set(`mitler/${id}`, { ad: data.baslik, tur: 'Hikâye', adres: mitAdresi(id) });
  }
  for (const bolum of bolumAnahtarlari) {
    for (const { id, data } of await getCollection(bolum)) {
      dizin.set(`${bolum}/${id}`, { ad: data.ad, tur: bolumler[bolum].tekil, adres: kayitAdresi(bolum, id) });
    }
  }
  for (const { id, data } of await getCollection('eserler')) {
    dizin.set(`eserler/${id}`, { ad: data.ad, tur: 'Antik eser', adres: kaynakAdresi(id) });
  }
  return ({ baglantilar }) =>
    Object.entries(baglantilar).flatMap(([klasor, kimlikler]) =>
      kimlikler.map((kimlik) => {
        const baglanti = dizin.get(`${klasor}/${kimlik}`);
        if (!baglanti) throw new Error(`Zaman atlası: ${klasor}/${kimlik} bulunamadı`);
        return baglanti;
      }),
    );
}
