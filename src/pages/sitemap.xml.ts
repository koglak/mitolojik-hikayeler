import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { antikKaynaklarAdresi, kaynakAdresi } from '../lib/antikKaynaklar';
import { bolumAdresi, bolumAnahtarlari, kayitAdresi, mitAdresi } from '../lib/bolumler';
import { bizKimizAdresi, mutlakAdres } from '../lib/site';
import { soyagaciAdresi } from '../lib/soyagaci';
import { kronolojiAdresi } from '../lib/zamanAtlasi/adres';

const xmlKacir = (metin: string) =>
  metin.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export const GET: APIRoute = async () => {
  const yollar = ['/', '/mitler/', soyagaciAdresi, kronolojiAdresi, antikKaynaklarAdresi, bizKimizAdresi, ...bolumAnahtarlari.map(bolumAdresi)];
  for (const mit of await getCollection('mitler')) yollar.push(mitAdresi(mit.id));
  for (const bolum of bolumAnahtarlari) {
    for (const kayit of await getCollection(bolum)) yollar.push(kayitAdresi(bolum, kayit.id));
  }
  for (const yazar of await getCollection('yazarlar')) yollar.push(kaynakAdresi(yazar.id));
  for (const eser of await getCollection('eserler')) yollar.push(kaynakAdresi(eser.id));
  const ogeler = yollar.map((yol) => `  <url><loc>${xmlKacir(mutlakAdres(yol))}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ogeler}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
