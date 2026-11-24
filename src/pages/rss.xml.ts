import type { APIRoute } from 'astro';
import { blogAciklamasi, blogAdi, blogAdresi, yaziAdresi } from '../lib/blog';
import { blogYazilariniGetir } from '../lib/blogDizini';
import { rssAdresi, rssXml } from '../lib/rss';
import { siteAdi } from '../lib/site';

export const GET: APIRoute = async () => {
  const xml = rssXml(
    { baslik: `${siteAdi} · ${blogAdi}`, aciklama: blogAciklamasi, yol: blogAdresi, akisYolu: rssAdresi },
    (await blogYazilariniGetir()).map(({ id, data }) => ({
      baslik: data.baslik,
      ozet: data.ozet,
      yol: yaziAdresi(id),
      tarih: data.tarih,
    })),
  );
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
