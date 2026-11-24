import type { APIRoute } from 'astro';
import { getCollection, type CollectionKey } from 'astro:content';
import { antikKaynaklarAdresi, kaynakAdresi } from '../lib/antikKaynaklar';
import { blogAdresi, yaziAdresi } from '../lib/blog';
import { bolumAdresi, bolumAnahtarlari, kayitAdresi, mitAdresi } from '../lib/bolumler';
import { sanatAdresi, sanatEserAdresi } from '../lib/sanat';
import { bizKimizAdresi } from '../lib/site';
import { siteHaritasiXml, type SiteHaritasiOgesi } from '../lib/siteHaritasi';
import { dosyaTarihleri, enSonTarih } from '../lib/sonDegisiklik';
import { soyagaciAdresi } from '../lib/soyagaci';
import { kronolojiAdresi } from '../lib/zamanAtlasi/adres';

export const GET: APIRoute = async () => {
  const tarihler = dosyaTarihleri();

  const koleksiyonOgeleri = async (koleksiyon: CollectionKey, adres: (kimlik: string) => string): Promise<SiteHaritasiOgesi[]> =>
    (await getCollection(koleksiyon)).map((kayit) => ({
      yol: adres(kayit.id),
      sonDegisiklik: kayit.filePath ? tarihler.get(kayit.filePath) : undefined,
    }));
  const veriTarihi = (onEk: string) =>
    enSonTarih([...tarihler].filter(([dosya]) => dosya.startsWith(onEk)).map(([, tarih]) => tarih));
  const dizinOgesi = (yol: string, ogeler: SiteHaritasiOgesi[]): SiteHaritasiOgesi => ({
    yol,
    sonDegisiklik: enSonTarih(ogeler.map((oge) => oge.sonDegisiklik)),
  });

  const mitler = await koleksiyonOgeleri('mitler', mitAdresi);
  const bolumler = await Promise.all(
    bolumAnahtarlari.map(async (bolum) => ({
      adres: bolumAdresi(bolum),
      ogeler: await koleksiyonOgeleri(bolum, (kimlik) => kayitAdresi(bolum, kimlik)),
    })),
  );
  const kaynaklar = [
    ...(await koleksiyonOgeleri('yazarlar', kaynakAdresi)),
    ...(await koleksiyonOgeleri('eserler', kaynakAdresi)),
  ];
  const sanat = await koleksiyonOgeleri('sanat', sanatEserAdresi);
  const blog = await koleksiyonOgeleri('blog', yaziAdresi);

  const xml = siteHaritasiXml([
    { yol: '/' },
    dizinOgesi('/mitler/', mitler),
    { yol: soyagaciAdresi, sonDegisiklik: veriTarihi('src/data/soyagaci') },
    { yol: kronolojiAdresi, sonDegisiklik: veriTarihi('src/data/zaman-atlasi/') },
    dizinOgesi(sanatAdresi, sanat),
    dizinOgesi(antikKaynaklarAdresi, kaynaklar),
    dizinOgesi(blogAdresi, blog),
    { yol: bizKimizAdresi },
    ...bolumler.map(({ adres, ogeler }) => dizinOgesi(adres, ogeler)),
    ...mitler,
    ...bolumler.flatMap(({ ogeler }) => ogeler),
    ...kaynaklar,
    ...sanat,
    ...blog,
  ]);
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
