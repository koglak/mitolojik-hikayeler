import { getCollection } from 'astro:content';
import { kaynakAdresi } from './antikKaynaklar';
import { bolumAnahtarlari, bolumler, kayitAdresi, mitAdresi } from './bolumler';
import { eserleriGetir, yazarlariGetir } from './kaynakDizini';
import { sanatEserAdresi, sanatTurleri } from './sanat';
import { muzeler, sanatEserleriniGetir } from './sanatDizini';
import { yaziAdresi } from './blog';
import { blogYazilariniGetir } from './blogDizini';
import { adresYaz, kronolojiAdresi } from './zamanAtlasi/adres';
import { atlas } from './zamanAtlasi/atlas';
import { aramaEsAnlamlari } from './aramaMetni';
import { antikKentRehberiAdresi } from './antikKentRehberi';

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
      const aramaTerimleri = bolum === 'tanrilar' ? aramaEsAnlamlari[oge.id] ?? [] : [];
      kayitlar.push({
        baslik: oge.data.ad,
        ozet: [oge.data.ozet, ...aramaTerimleri].join(' '),
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
  for (const { id, data } of await sanatEserleriniGetir()) {
    const muze = muzeler[data.muze];
    const tanriAdlari = data.ilgiliTanrilar.flatMap((tanri) => aramaEsAnlamlari[tanri] ?? []);
    kayitlar.push({
      baslik: data.ad,
      ozet: [data.ozgunAd, data.sanatci, data.ozet, muze.ad, muze.kent, ...(data.aramaTerimleri ?? []), ...tanriAdlari]
        .filter(Boolean)
        .join(' '),
      bolum: `Sanat eseri, ${sanatTurleri[data.tur].toLocaleLowerCase('tr')}`,
      adres: sanatEserAdresi(id),
    });
  }
  for (const { id, data } of await blogYazilariniGetir()) {
    kayitlar.push({ baslik: data.baslik, ozet: `${data.konu}. ${data.ozet}`, bolum: 'Blog', adres: yaziAdresi(id) });
  }
  kayitlar.push({
    baslik: 'Antik Kent Rehberi',
    ozet: 'Agora, tapınak, tiyatro, stoa, odeon, hamam, stadion, nekropol ve kent suru. Etkileşimli kent planı.',
    bolum: 'Kent Rehberi',
    adres: antikKentRehberiAdresi,
  });
  kayitlar.push({
    baslik: 'Antik Dünya Zaman Atlası',
    ozet: 'Kronoloji, zaman çizelgesi, uygarlıklar, hükümdarlar ve savaşlar.',
    bolum: 'Kronoloji',
    adres: kronolojiAdresi,
  });
  for (const [kimlik, { kayit }] of atlas.kayitlar) {
    kayitlar.push({ baslik: kayit.ad, ozet: kayit.ozet, bolum: 'Kronoloji', adres: adresYaz({ kayit: kimlik }) });
  }
  return kayitlar;
}
